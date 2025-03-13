/// <reference types= "cypress"/>
import { recurse } from 'cypress-recurse';

beforeEach(function(){
    cy.fixture('Last12Absence').then(function (cases) {
        cy.wrap(cases).as('testData');
    });
    cy.visit("");
});

it("Validate Last 12 Absence cards", function(){
    //**********************************************Login Page**********************************************************
    cy.get('[aria-label = "User ID"]').clear().type(this.testData.username); //UserName - HTML Attribute selector
    cy.xpath('//input[@id="password" or @type="password"]').clear().type(this.testData.password); //XPath selector
    cy.screenshot();
    cy.get('button[type^="sub"]').should('be.visible').click(); //Submit Button - CSS Selector begins with
    cy.contains('You have a new home page!').should('have.text','You have a new home page!').click(); //Navigate to Home Page - Visible Text
    //**********************************************Time and Absences***************************************************
    cy.get('#itemNode_my_information_absences1_0').click(); //Click on "Time and absences" - ID selector
    cy.contains("Existing Absences").click();
    cy.xpath("//a[@id='_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:abHiUpl:UPsp1:hisPce:fltrSel::drop']").click();
    cy.xpath("(//li[@class='x1l5'])[3]").click({force:true});
    cy.contains("Last 12 months").should('have.text','Last 12 months');
    //**********************************************Time and Absences***************************************************
    // if (cy.contains("Load More Items").should('exist'))
    // {cy.xpath("//a[@class='xj9']").click();}
    if (cy.xpath("//a[@class='xj9']").should('not.exist')){
    cy.xpath("//div[@style='width: 221px; max-width: 221px;']").should('have.text',"Existing Absences");
        // Find and iterate over each table element
    const testCase = this.testData.testCases[0];  // Iterate through data array in testCase[0]
    cy.get("table[id$=':hisPse:PSErlt']").each(($table, index) => {
        const data = testCase.cases[index]
        if (data){
        cy.log(index+1);
        cy.wrap($table).within(() => {
            cy.xpath("(//tbody/tr/td[@valign='top']/div[contains(@id,'hisPse:rootPgl')]/div[1])[" + (index+1) + "]").should('have.text',data.type); //Type hours
            cy.get("table[id$=':hisPse:dtPgl']").should('have.text',data.date); //Date
            cy.get("span[class='x2ku text-normal-4']").should('have.text',data.status); //Status
        })}
    })
    cy.screenshot();
}})

it("Validate Last 12 Absence cards filteres by status", function(){
    //**********************************************Login Page**********************************************************
    cy.get('[aria-label = "User ID"]').clear().type(this.testData.username); //UserName - HTML Attribute selector
    cy.xpath('//input[@id="password" or @type="password"]').clear().type(this.testData.password); //XPath selector
    cy.screenshot();
    cy.get('button[type^="sub"]').should('be.visible').click(); //Submit Button - CSS Selector begins with
    cy.contains('You have a new home page!').should('have.text','You have a new home page!').click(); //Navigate to Home Page - Visible Text
    //**********************************************Time and Absences***************************************************
    cy.get('#itemNode_my_information_absences1_0').click(); //Click on "Time and absences" - ID selector
    cy.contains("Existing Absences").click();
    cy.xpath("//a[@id='_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:abHiUpl:UPsp1:hisPce:fltrSel::drop']").click();
    cy.xpath("(//li[@class='x1l5'])[3]").click({force:true});
    cy.contains("Last 12 months").should('have.text','Last 12 months');
    cy.xpath("//input[@id='_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:abHiUpl:UPsp1:hisPce:key2Inp::content']").type(this.testData.filter_type); //Type - PTO or WFH
    cy.get("a[id='_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:abHiUpl:UPsp1:hisPce:clr2Cil']").dblclick();
    cy.reload();
    //**********************************************Time and Absences***************************************************
    // if (cy.xpath("//a[@class='xj9']").should('be.visible'))
    // {cy.xpath("//a[@class='xj9']").click();}
    if (cy.xpath("//a[@class='xj9']").should('not.exist')){
    cy.xpath("//div[@style='width: 221px; max-width: 221px;']").should('have.text',"Existing Absences");
        // Find and iterate over each table element
    const testCase = this.testData.testCases[1];  // Iterate through data array in testCase[1]
    cy.get("table[id$=':hisPse:PSErlt']").each(($table, index) => {
        const data = testCase.cases[index]
        if (data){
        cy.log(index+1);
        cy.wrap($table).within(() => {
            cy.xpath("(//tbody/tr/td[@valign='top']/div[contains(@id,'hisPse:rootPgl')]/div[1])[" + (index+1) + "]").should('have.text',data.type); //Type hours
            cy.get("table[id$=':hisPse:dtPgl']").should('have.text',data.date); //Date
            cy.get("span[class='x2ku text-normal-4']").should('have.text',data.status); //Status
        })}
    })
    cy.screenshot();
}})

it("Validate Last 12 Absence cards filteres by Leave Type", function(){
    //**********************************************Login Page**********************************************************
    cy.get('[aria-label = "User ID"]').clear().type(this.testData.username); //UserName - HTML Attribute selector
    cy.xpath('//input[@id="password" or @type="password"]').clear().type(this.testData.password); //XPath selector
    cy.screenshot();
    cy.get('button[type^="sub"]').should('be.visible').click(); //Submit Button - CSS Selector begins with
    cy.contains('You have a new home page!').should('have.text','You have a new home page!').click(); //Navigate to Home Page - Visible Text
    //**********************************************Time and Absences***************************************************
    cy.get('#itemNode_my_information_absences1_0').click(); //Click on "Time and absences" - ID selector
    cy.contains("Existing Absences").click();
    cy.xpath("//a[@id='_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:abHiUpl:UPsp1:hisPce:fltrSel::drop']").click();
    cy.xpath("(//li[@class='x1l5'])[3]").click({force:true});
    cy.contains("Last 12 months").should('have.text','Last 12 months');
    cy.xpath("//input[@id='_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:abHiUpl:UPsp1:hisPce:key2Inp::content']").type(this.testData.filter_status); //Type - Completed or Saved
    cy.get("a[id='_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:abHiUpl:UPsp1:hisPce:clr2Cil']").dblclick();
    cy.reload();
    //**********************************************Time and Absences***************************************************
    // if (cy.xpath("//a[@class='xj9']").should('be.visible'))
    // {cy.xpath("//a[@class='xj9']").click();}

    if (cy.xpath("//a[@class='xj9']").should('not.exist')){
    // Find and iterate over each table element
    cy.xpath("//div[@style='width: 221px; max-width: 221px;']").should('have.text',"Existing Absences");
    const testCase = this.testData.testCases[2];  // Iterate through data array in testCase[2]
    cy.get("table[id$=':hisPse:PSErlt']").each(($table, index) => {
        const data = testCase.cases[index]
        if (data){
        cy.log(index+1);
        cy.wrap($table).within(() => {
            cy.xpath("(//tbody/tr/td[@valign='top']/div[contains(@id,'hisPse:rootPgl')]/div[1])[" + (index+1) + "]").should('have.text',data.type); //Type hours
            cy.get("table[id$=':hisPse:dtPgl']").should('have.text',data.date); //Date
            cy.get("span[class='x2ku text-normal-4']").should('have.text',data.status); //Status
        })}
    })
    cy.screenshot();
}})
