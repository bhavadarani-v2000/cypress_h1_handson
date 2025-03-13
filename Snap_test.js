const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define your organization ID and project slug
const ORGANIZATION_ID = '0187e9ad'; // Your organization ID
const PROJECT_SLUG = 'cypress-test'; // Your project slug
const PERCY_TOKEN = 'web_8554e8bb7379a34951b8205a753bbb1e01d0de8fb9e8f5f150e82880604a7776'; // Ensure this is set in your environment

// Set up the request headers, including the authorization token
const headers = {
  'Authorization': `Token ${PERCY_TOKEN}`,
  'Accept': 'application/json',
};

// Function to move old JSON files to an Archive folder with formatted timestamp and build number
function archiveOldFiles(buildNumber) {
  const reportsDir = path.join(__dirname, 'cypress/Reports/Percy Report');
  const archiveDir = path.join(reportsDir, 'Archive');
  const filesToArchive = ['build_details.json', 'snapshots_response.json', 'page_load_time.json'];

  // Create the Archive folder if it doesn't exist
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir);
  }

  // Get the current timestamp and format it as YYYY-MM-DD_HH-MM-SS
  const date = new Date();
  const formattedTimestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}`;

  // Move each file to the Archive folder with the timestamp and build number appended
  filesToArchive.forEach(file => {
    const filePath = path.join(reportsDir, file);
    if (fs.existsSync(filePath)) {
      const archivedFilePath = path.join(archiveDir, `${file.replace('.json', '')}_Build # ${buildNumber}_${formattedTimestamp}.json`);
      fs.renameSync(filePath, archivedFilePath);
      console.log(`Archived ${file} to ${archivedFilePath}`);
    }
  });
}

// Function to fetch build details based on build number provided by user
async function fetchBuildDetails(buildNumber) {
  const apiUrl = `https://percy.io/api/v1/projects/${ORGANIZATION_ID}/${PROJECT_SLUG}/builds`;
  try {
    const response = await axios.get(apiUrl, { headers });
    const builds = response.data.data;

    if (builds && builds.length > 0) {
      // Find the build matching the given build number
      const buildDetails = builds.find(build => build.attributes['build-number'] === parseInt(buildNumber, 10));

      if (buildDetails) {
        const buildData = {
          buildId: buildDetails.id,
          buildNumber: buildDetails.attributes['build-number'],
          webUrl: buildDetails.attributes['web-url'],
        };
        console.log(`Build details for build number ${buildNumber}:`, buildData);

        // Write build details to a JSON file
        const buildDetailsFileName = path.join(__dirname, 'cypress/Reports/Percy Report/build_details.json');
        fs.writeFileSync(buildDetailsFileName, JSON.stringify(buildData, null, 2), 'utf8');
        console.log(`Build details have been written to ${buildDetailsFileName}`);

        return buildData; // Return the build details object
      } else {
        console.log(`No build found with build number ${buildNumber}.`);
        return null;
      }
    } else {
      console.log('No builds found for the project.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching build details:', error.message);
    if (error.response) {
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Body:', error.response.data);
    }
    throw error;
  }
}

// Function to fetch snapshots for a build and save to a JSON file without the "included" details
async function fetchSnapshotsForBuild(buildId) {
  const apiUrl = `https://percy.io/api/v1/builds/${buildId}/snapshots`;
  try {
    const response = await axios.get(apiUrl, { headers });

    // Remove the "included" property from the response before saving
    const snapshotData = {
      data: response.data.data,
    };

    // Save the modified response to a JSON file
    const snapshotsFileName = path.join(__dirname, 'cypress/Reports/Percy Report/snapshots_response.json');
    fs.writeFileSync(snapshotsFileName, JSON.stringify(snapshotData, null, 2), 'utf8');
    console.log(`Snapshot details have been written to ${snapshotsFileName}`);

    return response.data.data; // Return the snapshot data if needed
  } catch (error) {
    console.error(`Error fetching snapshots for Percy build ${buildId}:`, error.message);
    if (error.response) {
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Body:', error.response.data);
    }
    throw error;
  }
}

// Main function to archive old files, fetch build details, and snapshot details
async function fetchAndSaveBuildAndSnapshotDetails() {
  try {
    // Get the build number from the command line arguments
    const buildNumber = process.argv[2];
    if (!buildNumber) {
      console.log('Please provide a build number as an argument.');
      return;
    }

    // Archive existing JSON files
    archiveOldFiles(buildNumber);

    // Get the details of the specified build
    const buildDetails = await fetchBuildDetails(buildNumber);

    if (!buildDetails) {
      console.log(`Unable to retrieve details for build number ${buildNumber}.`);
      return;
    }

    // Fetch snapshots for this build and save to a separate JSON file
    await fetchSnapshotsForBuild(buildDetails.buildId);

  } catch (error) {
    console.error('Error occurred while fetching build and snapshot details:', error.message);
  }
}

// Call the function to fetch and save build and snapshot details
fetchAndSaveBuildAndSnapshotDetails();
