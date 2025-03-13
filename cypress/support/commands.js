// cypress/support/commands.js
import 'cypress-file-upload';
require('cypress-xpath');
import '@percy/cypress';
import 'cypress-iframe';

Cypress.Commands.add('measurePageLoadTime', (label, callback) => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
    if (typeof callback === 'function') {
      callback(loadTime);
    }
  });
});
Cypress.Commands.add('formatAmount', (amount) => {
  if (!amount.includes('.')) {
    return `${amount}.00`;
  }
  return amount;
});
Cypress.Commands.add('formatCurrency', (amount) => {
  // Validate if the input is a valid number
  if (isNaN(amount) || amount === null || amount === undefined) {
    throw new Error('Invalid amount provided to formatCurrency');
  }

  // Format the number with commas and two decimal places
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
});


