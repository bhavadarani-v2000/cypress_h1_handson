const fs = require('fs');
const path = require('path');

// Get the current timestamp
const now = new Date();
const timestamp = `${now.toDateString()} ${now.toTimeString().split(' ')[0]}`;

// Load test results
const reportData = JSON.parse(fs.readFileSync('cypress/reports/CustomReports/custom-report.json', 'utf-8'));

// HTML Template for the report
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Cypress Test Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: white;
      color: #333;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 40px;
    }
    header img {
      width: 150px;
    }
    .summary {
      margin-bottom: 30px;
      padding: 20px;
      background-color: #f4f4f4;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .summary h2 {
      margin-top: 0;
    }
    .summary table {
      width: 100%;
      border-collapse: collapse;
    }
    .summary table th, .summary table td {
      padding: 10px;
      text-align: left;
    }
    .summary table th {
      background-color: #2e3b4e;
      color: #f4f4f4;
    }
    .summary table tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .filters {
      margin-bottom: 20px;
    }
    .filters button {
      padding: 10px 15px;
      margin-right: 10px;
      border: none;
      cursor: pointer;
      color: black;
    }
    .filter-passed {
      background-color: #4caf50;
    }
    .filter-failed {
      background-color: #f44336;
    }
    .filter-skipped {
      background-color: #ff9800;
    }
    .test-case {
      margin-bottom: 20px;
      background-color: #f4f4f4;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .test-case.error {
      border-left: 5px solid #f44336;
    }
    .error-message {
      color: #f44336;
      font-weight: bold;
    }
    .media-container img, .media-container video {
      width: 100px;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      border: 2px solid #ddd;
    }
    .media-container img:hover {
      border-color: #2196f3;
    }
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.8);
      padding-top: 60px;
    }
    .modal-content {
      margin: auto;
      display: block;
      max-width: 80%;
      height: auto;
    }
    .close {
      position: absolute;
      top: 10px;
      right: 25px;
      color: #fff;
      font-size: 35px;
      font-weight: bold;
      cursor: pointer;
    }
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <header>
    <img src="C:/Cypress_Project/CypressNewProject/cypress/Reports/CustomReports/OIP.jfif" alt="Company Logo">
    <h1>Custom Cypress Test Report</h1>
    <p><strong>Generated on:</strong> ${timestamp}</p>
  </header>

  <section class="summary">
    <h2>Summary</h2>
    <table>
      <tr>
        <th>Total Test Suites</th>
        <td>${reportData.suites.length}</td>
      </tr>
      <tr>
        <th>Total Tests</th>
        <td>${reportData.totalTests}</td>
      </tr>
      <tr>
        <th>Total Passed</th>
        <td>${reportData.totalPassed}</td>
      </tr>
      <tr>
        <th>Total Failed</th>
        <td>${reportData.totalFailed}</td>
      </tr>
      <tr>
        <th>Total Skipped</th>
        <td>${reportData.totalSkipped}</td>
      </tr>
      <tr>
        <th>Total Duration (ms)</th>
        <td>${reportData.totalDuration}</td>
      </tr>
    </table>
  </section>

  <div class="chart-container">
    <canvas id="testChart" width="400" height="200"></canvas>
  </div>
  <br></br>

  <div class="filters">
    <button class="filter-passed" onclick="filterTests('passed')">Show Passed</button>
    <button class="filter-failed" onclick="filterTests('failed')">Show Failed</button>
    <button class="filter-skipped" onclick="filterTests('skipped')">Show Skipped</button>
    <button onclick="filterTests('all')">Show All</button>
  </div>

  ${reportData.suites.map(suite => `
    <div class="test-case ${suite.tests.some(test => test.state === 'failed') ? 'error' : ''}">
      <h3>${suite.fileName}</h3>
      <p><strong>Duration:</strong> ${suite.duration} ms</p>
      <ul>
        ${suite.tests.map(test => `
          <li class="test ${test.state === 'pending' ? 'skipped' : test.state}">
            ${test.title} - ${test.state === 'pending' ? 'skipped' : test.state} (${test.duration} ms)
            ${test.state === 'failed' ? `<div class="error-message">Error: ${test.displayError}</div>` : ''}
          </li>
        `).join('')}
      </ul>

      <!-- Display screenshots -->
      <div class="media-container">
        ${suite.screenshots.map(screenshot => `
          <img src="${screenshot}" alt="Screenshot" class="thumbnail">
        `).join('')}

        <!-- Display videos -->
        ${suite.videos.map(video => `
          <video controls>
            <source src="${video}" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
        `).join('')}
      </div>
    </div>
  `).join('')}

  <!-- Modal for displaying images -->
  <div id="myModal" class="modal">
    <span class="close">&times;</span>
    <img class="modal-content" id="img01">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
    // Chart.js script for bar chart
    const ctx = document.getElementById('testChart').getContext('2d');
    const chartData = {
      labels: ['Total Tests', 'Passed', 'Failed', 'Skipped'],
      datasets: [{
        label: 'Test Results',
        data: [${reportData.totalTests}, ${reportData.totalPassed}, ${reportData.totalFailed}, ${reportData.totalSkipped}],
        backgroundColor: ['#2196f3', '#4caf50', '#f44336', '#ff9800'],
      }]
    };
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Filter function for tests
    function filterTests(filter) {
      const allTests = document.querySelectorAll('.test-case li');
      allTests.forEach(test => {
        test.parentElement.parentElement.style.display = 'block';  // Show all test cases by default

        if (filter === 'all') {
          test.classList.remove('hidden');
        } else if (!test.classList.contains(filter)) {
          test.classList.add('hidden');
        } else {
          test.classList.remove('hidden');
        }
      });

      // Hide empty test cases
      const testCases = document.querySelectorAll('.test-case');
      testCases.forEach(testCase => {
        const visibleTests = testCase.querySelectorAll('li:not(.hidden)');
        if (visibleTests.length === 0) {
          testCase.style.display = 'none';
        }
      });
    }

    // Modal logic for expanding images
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const images = document.querySelectorAll('.media-container img');

    images.forEach(image => {
      image.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
      }
    });

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
    }
  </script>
</body>
</html>
`;

// Write the HTML to a file
fs.writeFileSync(path.join(__dirname, 'cypress/reports/CustomReports/custom-report.html'), htmlTemplate);

console.log('Custom HTML report with error messages and media generated successfully!');
