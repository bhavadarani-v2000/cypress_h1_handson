/// <reference types= "cypress"/>

beforeEach(function()
{
    cy.fixture('Oracle').then(function (data) {
        this.data = data;
    });
    cy.visit("https://cxb2csvc214.rightnowdemo.com/AgentWeb/");
})


it("Oracle Login", function()
{
    // *****************Login*****************************************************************
    cy.get('#username').clear().type(this.data.username);
    cy.get('#password').clear().type(this.data.password);
    cy.screenshot();
    cy.get('#loginbutton').click();
    // *********************************Search Contact*****************************************
    cy.wait(15000);
    cy.xpath("//button[@id='quickSearchSearchButton']",{timeout : 10000}).click();
    cy.get("input[class='oj-inputtext-input oj-text-field-input oj-component-initnode']").eq(0).type(this.data.lastname);
    cy.screenshot();
    cy.get("#oj-collapsible-1-content > div:nth-child(5) > div > oj-button.newButtonComponent.oj-button-toggle.oj-component.oj-component-initnode.oj-button-full-chrome.searchFilters.filterSearch.filterButtonMargin.oj-button.oj-button-text-icon-start.oj-enabled.oj-complete.oj-default",{ timeout: 10000 }).click();
    cy.contains(this.data.lastname).dblclick();
    cy.xpath("(//span[@data-bind='text: tab.label'])[2]").should('have.text',this.data.fullname);
    cy.wait(3000);
    cy.screenshot();
    // *********************************Create Contact*****************************************
    // cy.get("div[class='ws-toolbar-button-image bui-icon new-icon fa-lg']",{timeout:1000}).click({force:true}); //click on New Button
    // cy.get(5000);
    // cy.get("input[class='oj-inputtext-input oj-text-field-input oj-component-initnode']",{timeout:3000}).eq(15).type('Bhavadarani'); //First Name
    // cy.get("input[class='oj-inputtext-input oj-text-field-input oj-component-initnode']",{timeout:3000}).eq(16).type('Varadarajan'); //Last Name
    // cy.xpath("input[class='oj-inputtext-input oj-text-field-input oj-component-initnode']",{timeout:3000}).eq(17).type('bhavadarani.v@mastechdigital.com'); //Email
    // cy.screenshot();
    // cy.get("button[id='toolBarCommandButton_button_236_ContactSaveAndClose']").click(); //Save and Close button



    // cy.xpath("(//span[@class='oj-ux-ico-menu'])[1]",{timeout : 10000}).click(); // Menu 
    // cy.xpath("(//div[@id='oj-collapsible-navigationItemHeader-header'])[8]").click(); //Contacts drop down
    // cy.xpath('(//span[@class="navigation-content"])[23]').click(); //Contacts
    // cy.get("input[class='oj-inputtext-input oj-text-field-input oj-component-initnode']").eq(0).type(this.data.lastname);
    // cy.xpath("//span[@id='_oj193|text'][@class='oj-button-text']").click();

})