/// <reference types= "cypress"/>
import { calender } from '../../support/BeforeEach_DeleteEntries';
let credentials;
before(function () 
{
    cy.task('readExcelSheets', { filePath: 'cypress/fixtures/Calender.xlsx' }).then((sheetsData) => {
        credentials = sheetsData['Creds']; // Data from "Credentials" sheet
        // testData = sheetsData['TestData'];       // Data from "TestData" sheet
    });
});
it("Check Absence Balance", ()=>{
    cy.visit('');
    cy.get('[aria-label="User ID"]').clear().type(credentials[0].username);
    cy.xpath('//input[@id="password" or @type="password"]').clear().type(credentials[0].password);
    cy.xpath("//button[@id='btnActive']").should('be.visible').click();
    cy.contains('You have a new home page!').click();
    cy.get('#itemNode_my_information_absences1_0').click();
    cy.get("div[id='_FOpt1:_FOr1:0:_FONSr2:0:_FOTsr1:0:lp1Upl:UPsp1:i2:6:tb1:TBpgl2']").click();
    cy.get("td[class='x1ib']").eq(13).click(); 
    cy.get('[class="xvl"]')
      .find('[class="xvi"][_adfday="12/24/2024"]')
      .parent() // Traverse to the parent containing the text
      .siblings('.x15c') // Locate the sibling element where the PTO text is shown
      .should('contain', 'PTO IN, Hours: 8');
    
    // Check that 12/16/2024 has no PTO or holiday information
    cy.get('[class="xvl"]')
      .find('[class="xvi"][_adfday="12/16/2024"]')
      .parent() // Traverse to the parent containing the text
      .siblings('.x15c') // Locate the sibling element
      .should('not.exist');

    // Check for Christmas Day on 12/25/2024
    cy.get('[class="xvl"]')
      .find('[class="xvi"][_adfday="12/25/2024"]')
      .parent() // Traverse to the parent containing the text
      .siblings('.x15e') // Locate the sibling with the holiday name
      .find('span[_adhdtxt="true"]') // Locate the span with the text
      .should('contain', 'Christmas Day IN 2024');
})