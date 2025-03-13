import './commands';
import '@shelex/cypress-allure-plugin';
import 'cypress-mochawesome-reporter/register';
import 'cypress-shadow-dom';


Cypress.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent Cypress from failing the test on uncaught exceptions
    return false;
  });
  const { addCompareSnapshotCommand } = require('cypress-visual-regression/dist/command')
  addCompareSnapshotCommand()  