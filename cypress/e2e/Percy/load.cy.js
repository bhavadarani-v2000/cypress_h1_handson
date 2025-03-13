// In your test file:
describe('Percy', () => {
  const ENV2_URL = 'https://www.amazon.in';
  const pageLoadTimes = []; // Array to store page load times
// $env:PERCY_TOKEN = "web_421bb7f89804f1bf8625f5ef7494b8b1b152c0709f3fdedb251ce06e8d52cec5"
  // before(() => {
  //   const specFileName = Cypress.spec.name; // Get the current spec file name
  //   cy.task('archiveOldFiles', specFileName);
  // });

  it('Env1', () => {
    cy.visit(ENV2_URL);
    // Capture page load time for the homepage
    // cy.measurePageLoadTime('Homepage', (loadTime) => {
    //   pageLoadTimes.push({
    //     label: 'Homepage',pageLoadTime: loadTime,timestamp: new Date().toISOString(),
    //   });
    // });

    // Dashboard 1: Mobile Page
    cy.get(".nav-a[href='/mobile-phones/b/?ie=UTF8&node=1389401031&ref_=nav_cs_mobiles']").click({ force: true });
    // cy.measurePageLoadTime('Mobile Page', (loadTime) => {
    //   pageLoadTimes.push({
    //     label: 'Mobile Page',pageLoadTime: loadTime,timestamp: new Date().toISOString(),
    //   });
    // });
    // Take snapshots and screenshots
    // cy.percySnapshot('Mobile_En1');
    cy.screenshot('Mobile_En1');

    // Dashboard 2: Electronics Page
    // cy.xpath("//a[contains(text(),'Electronics')]").click({ force: true });
    // cy.measurePageLoadTime('Electronics Page', (loadTime) => {
    //   pageLoadTimes.push({
    //     label: 'Electronics Page',pageLoadTime: loadTime,timestamp: new Date().toISOString(),
    //   });
    // });

    // cy.percySnapshot('Electronic_En1');
    // cy.screenshot('Electronic_En1');
  });

  // after(() => {
  //   // Write collected page load times to a JSON file at the end of the test
  //   cy.writeFile('cypress/Reports/page_load_times.json', pageLoadTimes);
  // });
});