const prevButtonSelector = '.gt-calendar-control-prev';
const nextButtonSelector = '.gt-calendar-control-next';
const monthSelector = '.gt-calendar-control span.text-3';
const calendarBodySelector = 'tbody[class="gt-calendar-body"]';

let credentials,calendarDataByMonth;
before(function () {
  // Read Excel data (from a single sheet) and parse it
  cy.task('readExcelSheets', { filePath: 'cypress/fixtures/Access.xlsx' }).then((sheetData) => {
    credentials = sheetData['Creds'];

    // Organize the data by month (group by month name)
    calendarDataByMonth = sheetData['Calendar'].reduce((acc, row) => {
      const { month, date, status } = row;
      if (!acc[month]) acc[month] = [];
      acc[month].push({ date, status });
      return acc;
    }, {});
  });
});

describe('Expenses Page', () => {
  it('Validate Calendar Month by Month', function () {
    cy.visit("https://infotrellis.greythr.com");

    // Login process
    cy.get('#username').clear().type(credentials[0].username);
    cy.get('#password').clear().type(credentials[0].password);
    cy.get("button[type='submit']").click();

    // Navigate to Attendance Info
    cy.get("div[class='image-hamburger hamburger-container ng-star-inserted']").click();
    cy.xpath("//gt-sidebar[@class='ng-star-inserted']//gt-ess-menu[@class='ng-star-inserted hydrated']")
      .shadow().find('img[alt="attendance"]').click({ force: true });
    cy.xpath("//gt-sidebar[@class='ng-star-inserted']//gt-ess-menu[@class='ng-star-inserted hydrated']")
      .shadow().contains("Attendance Info").click({ force: true });
    cy.get("div[class='image-drawer drawer-container ng-star-inserted']").last().click();
    cy.get("h1[class='text-secondary-600 mt-2x mb-1x text-base font-normal ng-star-inserted']").should('have.text', ' Attendance Info ');
    for (let i = 0; i < 6; i++) {
      cy.get(prevButtonSelector).click();
    }
    // Iterate over each month's data
    Object.entries(calendarDataByMonth).forEach(([month, calendarData], index, monthsArray) => {
      // Validate calendar data for the current month
      cy.log(`Validating data for ${month}`);
      cy.get(monthSelector).invoke('text').then((currentMonth) => {
        if (currentMonth !== month) {
          cy.log(`Navigating to ${month}`);
          if (currentMonth < month) {
            // If the current month is earlier, click "Next"
            cy.get(nextButtonSelector).click();
          } else {
            // If the current month is later, click "Previous"
            cy.get(prevButtonSelector).click();
          }
        }
      });

      // Validate data for the current month
      calendarData.forEach(({ date, status }) => {
        cy.get(calendarBodySelector).within(() => {
          cy.get("gt-attendance-calendar-cell[style^='background: rgb'] span[class='cell-date']")
            .contains(date.toString()) // Locate the cell containing the date
            .parents(".gt-calendar-cell") // Get the parent .gt-calendar-cell
            .should('exist') // Ensure the cell exists
            .each(($cell) => {
              cy.wrap($cell).within(() => {
                cy.get("gt-attendance-calendar-cell[style^='background: rgb'] span[class='cell-date']")
                  .should('have.text', date.toString()); // Verify the date in the cell
                cy.get('.status .text-4').invoke('text').should('eq', status); // Verify the status matches
              });
            });
        });
      });

    });
  });
});
