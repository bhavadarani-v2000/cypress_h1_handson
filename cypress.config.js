const {
	defineConfig
} = require('cypress');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const mysql = require("mysql");
const oracledb = require("oracledb");

// Oracle DB credentials 
const db_config = {
	user: "root",
	password: "root",
	connectString: "localhost:1521/xe"
}

const queryData = async (query, db_config) => {
	let conn;
	try {
		// It's failing on this getConnection line
		conn = await oracledb.getConnection(db_config);
		console.log("NOTE===>connect established")
		return await conn.execute(query);
	} catch (err) {
		console.log("Error===>" + err)
		return err
	} finally {
		if (conn) {
			try {
				conn.close();
			} catch (err) {
				console.log("Error===>" + err)
			}
		}
	}
}
module.exports = defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		charts: true,
		reportDir: 'cypress/Reports/Mochawesome', // Ensure this matches your actual path
		reportPageTitle: 'Mochawesome Report',
		embeddedScreenshots: true,
		inlineAssets: true,
		saveAllAttempts: false,
		html: false,
		json: false,
	},
	e2e: {
		baseUrl: 'https://ehof.fa.us2.oraclecloud.com',
		viewportWidth: 1280,
		viewportHeight: 800,
		chromeWebSecurity: false,
		video: true,
		screenshot: true,
		videosFolder: 'cypress/videos/',
		screenshotsFolder: 'cypress/screenshots/',
		pageLoadTimeout: 50000,
		defaultCommandTimeout: 50000,
		setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on);
			//************************************Custom Report *******************************************************      
			const reportDir = path.resolve('cypress/reports/CustomReports');
			const archiveDir = path.join(reportDir, 'archive');
	  
			// Ensure Archive directory exists
			if (!fs.existsSync(archiveDir)) {
			  fs.mkdirSync(archiveDir, { recursive: true });
			}
			on('before:spec', (spec) => {
				const jsonReportPath = path.join(reportDir, 'custom-report.json');
				const htmlReportPath = path.join(reportDir, 'custom-report.html');
				const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
				const specFileName = path.basename(spec.relative, '.cy.js');
		
				// Function to archive a report file
				const archiveReport = (reportPath, fileType) => {
				  if (fs.existsSync(reportPath)) {
					const archivedReportPath = path.join(
					  archiveDir,
					  `${specFileName}-${fileType}-report-${timestamp}.${fileType}`
					);
					fs.renameSync(reportPath, archivedReportPath);
					console.log(`Archived ${fileType.toUpperCase()} report to: ${archivedReportPath}`);
				  }
				};
		
				// Archive the JSON and HTML reports
				archiveReport(jsonReportPath, 'json');
				archiveReport(htmlReportPath, 'html');
			  });
			let testResults = {
				suites: [],
				totalTests: 0,
				totalPassed: 0,
				totalFailed: 0,
				totalSkipped: 0,
				totalDuration: 0,
				timestamp: "",
			};

			// Function to get screenshot and video paths
			const getMediaFiles = (specFile) => {
				const specFileName = path.basename(specFile); // Keep the extension

				// Create directory paths for screenshots and videos specific to this spec file
				const screenshotsDir = path.resolve('cypress/screenshots', specFileName);
				const videosDir = path.resolve('cypress/videos', `${specFileName}.mp4`); // Append .mp4 to videosPath

				let screenshots = [];
				let videos = [];

				// Retrieve screenshots
				if (fs.existsSync(screenshotsDir)) {
					screenshots = fs.readdirSync(screenshotsDir).map(file => path.resolve(screenshotsDir, file));
				}

				// Retrieve video
				const videoFile = videosDir; // Updated to point to the correct video file path
				if (fs.existsSync(videoFile)) {
					videos.push(videoFile);
				}

				return {
					screenshots,
					videos,
					screenshotsDir,
					videosDir
				};
			};

			// Capture results after each spec (entire file)
			on('after:spec', (spec, results) => {
				let skippedCount = 0;

				// Count skipped tests
				results.tests.forEach(test => {
					if (test.state === 'pending' || test.state === 'skipped') {
						skippedCount++;
					}
				});

				// Retrieve media files for the current spec
				const media = getMediaFiles(spec.relative);

				const suite = {
					fileName: spec.relative, // Keep the full path with extension
					tests: results.tests,
					passed: results.stats.passes,
					failed: results.stats.failures,
					skipped: skippedCount,
					duration: results.stats.duration,
					screenshots: media.screenshots,
					videos: media.videos,
					screenshotsPath: media.screenshotsDir, // Include screenshot folder path
					videosPath: media.videos.length > 0 ? media.videos[0] : null, // Append .mp4 for video file
				};

				// Update test results
				testResults.suites.push(suite);
				testResults.totalTests += results.stats.tests;
				testResults.totalPassed += results.stats.passes;
				testResults.totalFailed += results.stats.failures;
				testResults.totalSkipped += skippedCount;
				testResults.totalDuration += results.stats.duration;
			});

			// Write report after all specs are done
			on('after:run', () => {
				const reportDir = path.resolve('cypress/reports/CustomReports');
				const reportPath = path.join(reportDir, 'custom-report.json');

				// Ensure directory exists
				if (!fs.existsSync(reportDir)) {
					fs.mkdirSync(reportDir, {
						recursive: true
					});
				}

				// Add timestamp
				testResults.timestamp = new Date().toLocaleString();

				// Write JSON report with absolute paths
				fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2), 'utf8');
				console.log(`Custom report written to: ${reportPath}`);
			});
			//********************************************Query***********************************************   
			on("task", {
				queryDb: (query) => {
					return queryTestDb(query, config);
				}
			});
			//*********************************************Excel**********************************************   
			on('task', {
				readExcelSheets({
					filePath
				}) {
					const workbook = xlsx.readFile(path.resolve(filePath));
					const sheetsData = {};

					workbook.SheetNames.forEach((sheetName) => {
						const sheet = workbook.Sheets[sheetName];
						sheetsData[sheetName] = xlsx.utils.sheet_to_json(sheet); // Convert each sheet to JSON
					});

					return sheetsData; // Return all sheets as an object
				},
			});
			return config; // Return updated config
		},
		specPattern: "cypress/e2e/**/*.cy.js",
	},
  "env":{
    visualRegressionType: 'regression',
    "db":{
      "server" : '127.0.0.1',
      user : "root",
      password : "root",
      database : "world"
    }
  }
});
//******************************************************************************************* 
function queryTestDb(query, config) {
	const connection = mysql.createConnection(config.env.db);
	connection.connect();
	return new Promise((resolve, reject) => {
		connection.query(query, (error, results) => {
			if (error) reject(error);
			else {
				connection.end();
				return resolve(results);
			}
		});
	});
}