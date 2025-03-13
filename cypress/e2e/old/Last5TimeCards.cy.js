/// <reference types= "cypress"/>

beforeEach(function(){
    cy.fixture('Last5TimeCards').then(function (data) {
        this.data = data;
    });
    cy.visit("");
});


it("Validate Last 5 Timecards", function(){
//**********************************************Login Page**********************************************************
    cy.get('[aria-label = "User ID"]').clear().type('533894'); //UserName - HTML Attribute selector
    cy.xpath('//input[@id="password" or @type="password"]').clear().type('Password@123'); //XPath selector
    cy.screenshot();
    cy.get('button[type^="sub"]').should('be.visible').click(); //Submit Button - CSS Selector begins with
    cy.contains('You have a new home page!').should('have.text','You have a new home page!').click(); //Navigate to Home Page - Visible Text
//**********************************************Time and Absences***************************************************
    cy.get('#itemNode_my_information_absences1_0').click(); //Click on "Time and absences" - ID selector
    cy.get('span[class="title three-line-truncation"]').eq(1).click(); //Existing Time Card
    cy.get("h1[class='xnu ']").should('have.text',"Existing Time Cards");

    // Find and iterate over each table element
    cy.xpath("//div[@class='x3au x3as x1a']").each(($table, index, $list) => 
    {
        // Click on the current table element
        const listdata = this.data[index];
        cy.wrap($table).then(() => 
        {
            cy.get("a[id$=':tcPse:tcLnk']").eq(index).click(); //click on URL
            if(listdata.status == 'Approved')
            {
                cy.get("span[class='scoreboard-value text-green']").should('have.text',listdata.status); //Time Card Status
            }
            else if(listdata.status == 'Saved')
            {
                cy.xpath("//span[@class='scoreboard-value text-lightblue']").first().should('have.text',listdata.status); //Time Card Status
            }
            else if(listdata.status == 'Submitted')
            {
              cy.xpath("//span[@class='scoreboard-value text-red']").should('have.text',listdata.status); //Time Card Status
            }
            cy.xpath("//h1[@class='xnu ']").should('have.text',listdata.week) // Time Card Week
            cy.get("span[class='scoreboard-value text-lightblue']").should('contain.text',listdata.total_hours); //Reported Hours
            // Iterate over each Billing Code
            listdata.project_code.forEach((code, indx) => {
                cy.get("table[id$=':stePse:ivPgl']").eq(indx).should('have.text',code); //Project Code
            })
            listdata.each_hours.forEach((code, indx) => {
                cy.get("span[class='x2z9']").eq(indx).should('have.text',code); //Project Code
            })
            cy.screenshot();
            cy.get("span[class='x1k8']").last().click();
        });
    });
});
