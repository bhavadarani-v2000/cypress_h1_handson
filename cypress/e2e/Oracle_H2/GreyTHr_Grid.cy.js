const prevButtonSelector = '.gt-calendar-control-prev';
const nextButtonSelector = '.gt-calendar-control-next';
const monthSelector = '.gt-calendar-control span.text-3';
const calendarBodySelector = '//tbody[@class="gt-calendar-body"]';

let credentials,calendarDataByMonth,results;
before(function () {
  cy.task("queryDb","select * from world.creds;").then(res => {
    results = Object.values(res[0]);
  })
  // Read Excel data (from a single sheet) and parse it
  cy.task('readExcelSheets', { filePath: 'cypress/fixtures/Access.xlsx' }).then((sheetData) => {
    // Organize the data by month (group by month name)
    calendarDataByMonth = sheetData['Calendar1'].reduce((acc, row) => {
      const { month, date, status } = row;
      if (!acc[month]) acc[month] = [];
      acc[month].push({ date, status });
      return acc;
    }, {});
  });
});

describe('GreyTHr', () => {
  it('Validate Calendar Month by Month', function () {
    cy.visit("https://infotrellis.greythr.com");

    // Login process
    cy.get('#username').clear().type(results[0]);
    cy.get('#password').clear().type(results[1]);
    cy.get("button[type='submit']").click();

    // Navigate to Attendance Info
    // cy.get("div[class='image-hamburger hamburger-container ng-star-inserted']").click();
    cy.xpath("//gt-sidebar[@class='ng-star-inserted']//gt-ess-menu[@class='ng-star-inserted hydrated']")
      .shadow().find('img[alt="attendance"]').click({ force: true });
    cy.xpath("//gt-sidebar[@class='ng-star-inserted']//gt-ess-menu[@class='ng-star-inserted hydrated']")
      .shadow().contains("Attendance Info").click({ force: true });
    // cy.get("div[class='image-drawer drawer-container ng-star-inserted']").last().click();
    cy.get("h1[class='text-secondary-600 mt-2x mb-1x text-base font-normal ng-star-inserted']").should('have.text', ' Attendance Info ');
    for (let i = 0; i < 6; i++) {
      cy.get(prevButtonSelector).click();
    }
        // Iterate over each month's data
        Object.entries(calendarDataByMonth).forEach(([month, calendarData]) => {
          cy.log(`Validating data for ${month}`);    
          // Validate the month by navigating
          cy.get(monthSelector).invoke('text').then((currentMonth) => {
            if (currentMonth !== month) {
              cy.log(`Navigating to ${month}`);
              if (currentMonth < month) {
                cy.get(nextButtonSelector).click();
              } else {
                cy.get(prevButtonSelector).click();
              }
            }
          });
          cy.xpath(calendarBodySelector, { timeout: 1000 })
          .should('be.visible')
          .then(() => {
            cy.screenshot(`FullPage_${month}`, { capture: 'fullPage' });
          });
          // Validate calendar data for the current month
          cy.xpath(calendarBodySelector,{timeout:1000}).within(() => {
            // Collect all calendar cells and validate for each date
            cy.get("gt-attendance-calendar-cell[style^='background: rgb'] span[class='cell-date']").each(($cell) => {
              const cellDate = $cell.text().trim(); // Extract the text from the cell
              const matchingData = calendarData.find(({ date }) => date.toString() === cellDate); // Find matching data
    
              if (matchingData) {
                const { date, status } = matchingData;
                // Verify the date and status
                cy.wrap($cell).parents(".gt-calendar-cell").within(() => {
                  cy.get("span[class='cell-date']").should('have.text', date.toString()); // Verify the date
                  cy.get('.status .text-4').invoke('text').should('eq', status); // Verify the status
                });
              }
            });
          });
        });
  });
});
