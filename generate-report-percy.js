const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Define paths to the input JSON files and output directory
const pageLoadTimesPath = path.join(__dirname, 'cypress/Reports/Percy Report/page_load_times.json');
const snapshotsResponsePath = path.join(__dirname, 'cypress/Reports/Percy Report/snapshots_response.json');
const buildDetailsPath = path.join(__dirname, 'cypress/Reports/Percy Report/build_details.json');
const outputDir = path.join(__dirname, 'cypress/Reports/Percy Report');

// Read the JSON files
const pageLoadTimesData = JSON.parse(fs.readFileSync(pageLoadTimesPath, 'utf8'));
const snapshotsResponseData = JSON.parse(fs.readFileSync(snapshotsResponsePath, 'utf8'));
const buildDetailsData = JSON.parse(fs.readFileSync(buildDetailsPath, 'utf8'));

// Function to format timestamp to DD-MM-YYYY HH:mm:ss
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

// Extract relevant data from the page load times
const pageLoadData = pageLoadTimesData.map(page => {
  // Convert timestamp to formatted system time (DD-MM-YYYY HH:mm:ss)
  const formattedTimestamp = formatTimestamp(page.timestamp);

  return {
    label: page.label,                 // Use 'label' as the page name
    loadTime: page.pageLoadTime / 1000, // Convert load time to seconds
    timestamp: formattedTimestamp       // Use formatted timestamp
  };
});

// Extract relevant data from snapshots response and build details
const snapshotDifferences = {
  buildId: buildDetailsData.buildId,      // Get buildId from build_details.json
  buildNumber: buildDetailsData.buildNumber, // Get buildNumber from build_details.json
  webUrl: buildDetailsData.webUrl,         // Get webUrl from build_details.json
  snapshots: snapshotsResponseData.data.map(snapshot => {
    // Safely access 'diff-ratio' with fallback
    let diffRatio = snapshot.attributes && snapshot.attributes['diff-ratio'] !== undefined
      ? snapshot.attributes['diff-ratio'] * 100 // Multiply diff-ratio by 100
      : 0; // Default value if 'diff-ratio' is missing

    // Round off diffRatio to two decimal places
    diffRatio = Math.round(diffRatio * 100) / 100;

    return {
      name: snapshot.attributes.name,
      diffRatio: diffRatio // Keep diffRatio rounded to two decimal places
    };
  })
};

// Path to the EJS template
const templatePath = path.join(__dirname, 'report-template.ejs');

// Generate the HTML report using EJS
ejs.renderFile(templatePath, { pageLoadData, snapshotDifferences }, (err, htmlContent) => {
  if (err) {
    console.error('Error generating HTML report:', err);
    return;
  }

  // Define the output path for the HTML report
  const outputPath = path.join(outputDir, 'test-report.html');

  // Write the generated HTML to the output file
  fs.writeFileSync(outputPath, htmlContent, 'utf8');
  console.log('Report generated successfully:', outputPath);
});
