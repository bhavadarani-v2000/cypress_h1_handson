const { defineConfig } = require("cypress");
const mysql = require("mysql");
const oracledb = require("oracledb");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { configureVisualRegression } = require('cypress-visual-regression')
const { addCompareSnapshotCommand } = require('cypress-visual-regression/dist/command')

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
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    charts: true,
    reportPageTitle: 'Oracle Mochawesome Reports',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    html : false,
    viewportWidth: 1280,
    viewportHeight: 800,
    supportFile: 'cypress/support/e2e.js', // This will import the custom commands automatically
    baseUrl: "https://ehof.fa.us2.oraclecloud.com",
    defaultCommandTimeout : 29990,
    pageLoadTimeout : 29990,
    video : true,
    screenshot : true,
    videosFolder : "cypress/videos/",
    screenshotsFolder : "cypress/screenshots/Actuals",
    setupNodeEvents(on, config) 
    {
      require('cypress-mochawesome-reporter/plugin')(on);
      configureVisualRegression(on);
      allureWriter(on, config);
      on('task', {
        archiveOldFiles(specFileName) {
          const reportsDir = path.join(__dirname, 'cypress', 'Reports','Percy Report');
          const archiveDir = path.join(reportsDir, 'Archive');
          const fileName = 'page_load_times.json';
      
          // Create directories if they don't exist
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
          }
          if (!fs.existsSync(archiveDir)) {
            fs.mkdirSync(archiveDir, { recursive: true });
          }
      
          const filePath = path.join(reportsDir, fileName);
          if (fs.existsSync(filePath)) {
            const date = new Date();
            const formattedTimestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}`;
      
            // Include the spec file name in the archived file name
            const specName = specFileName.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize spec file name
            const archivedFilePath = path.join(archiveDir, `${fileName.replace('.json', '')}_${specName}_${formattedTimestamp}.json`);
      
            fs.renameSync(filePath, archivedFilePath);
            console.log(`Archived old JSON file to ${archivedFilePath}`);
          } else {
            console.log('No file to archive.');
          }
      
          return null; // Return null to indicate the task is complete
        }
      });      
      on('task', {
        savePageLoadTime(pageLoadData) {
          const reportsDir = path.join(__dirname, 'cypress/Reports/Percy Report');
          const filePath = path.join(reportsDir, 'page_load_times.json');
          
          // Read existing data or initialize an empty array
          let data = [];
          if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          }

          // Add the new data
          data.push(pageLoadData);

          // Save back to the file
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          console.log(`Page load time saved for ${pageLoadData.pageName}`);

          return null; // Indicate task completion
        }
      });
      on("task",{
        queryDb: (query) => {
          return queryTestDb(query,config);
        }
      });
      return config;
    },
  },
  "env":{
    visualRegressionType: 'regression',
    "db":{
      "server" : '127.0.0.1',
      user : "root",
      password : "root",
      database : "world",
      visualRegressionType: 'regression',
      visualRegressionBaseDirectory: 'cypress/snapshot/base',
      visualRegressionDiffDirectory: 'cypress/snapshot/diff',
      visualRegressionGenerateDiff: 'always',
      visualRegressionFailSilently: true
    }
  }
});

function queryTestDb(query,config){
  const connection = mysql.createConnection(config.env.db);
  connection.connect();
  return new Promise((resolve,reject)=>{
    connection.query(query,(error,results)=>{
      if (error) reject(error);
      else{
        connection.end();
        return resolve(results);
      }
    });
  });
}
addCompareSnapshotCommand({
  capture: 'fullPage', // cypress screenshot option
  errorThreshold: 0.5, // plugin threshold option
  pixelmatchOptions: {
    threshold: 0 // pixelmatch threshold option
  }
})