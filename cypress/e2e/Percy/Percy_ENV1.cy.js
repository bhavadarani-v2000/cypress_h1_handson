// In your test file:
describe('Percy', () => {
  const URL = 'https://www.amazon.in';
  const pageLoadTimes = []; // Array to store page load times

  before(() => {
    const specFileName = Cypress.spec.name; // Get the current spec file name
    cy.task('archiveOldFiles', specFileName);
  });

  it('Env1', () => {
    cy.visit(URL);
    // Capture page load time for the homepage
    cy.measurePageLoadTime('Homepage', (loadTime) => {
      pageLoadTimes.push({
        label: 'Homepage',pageLoadTime: loadTime,timestamp: new Date().toISOString(),
      });
    });

    // Dashboard 1: Mobile Page
    cy.get(".nav-a[href='/mobile-phones/b/?ie=UTF8&node=1389401031&ref_=nav_cs_mobiles']").click({ force: true });
    cy.measurePageLoadTime('Mobile Page', (loadTime) => {
      pageLoadTimes.push({
        label: 'Mobile Page',pageLoadTime: loadTime,timestamp: new Date().toISOString(),
      });
    });
    // Take snapshots and screenshots
    // cy.percySnapshot('Mobile_En1');
    cy.screenshot('Mobile_En1');

    // Dashboard 2: Sell Page
    cy.get(".nav-a[href='/b/32702023031?node=32702023031&ld=AZINSOANavDesktop_T3&ref_=nav_cs_sell_T3']").click({ force: true });
    cy.measurePageLoadTime('Sell Page', (loadTime) => {
      pageLoadTimes.push({
        label: 'Sell Page',pageLoadTime: loadTime,timestamp: new Date().toISOString(),
      });
    });

    // cy.percySnapshot('Sell_En1');
    cy.screenshot('Sell_En1');

    // Dashboard 3: Electronics Page
    cy.get(".nav-a[href='/electronics/b/?ie=UTF8&node=976419031&ref_=nav_cs_electronics']").click({ force: true });
    cy.measurePageLoadTime('Electronics Page', (loadTime) => {
      pageLoadTimes.push({
        label: 'Electronics Page',pageLoadTime: loadTime,timestamp: new Date().toISOString(),
      });
    });

    // cy.percySnapshot('Electronic_En1');
    cy.screenshot('Electronic_En1');
  });

  after(() => {
    // Write collected page load times to a JSON file at the end of the test
    cy.writeFile('cypress/Reports/page_load_times.json', pageLoadTimes);
  });
});