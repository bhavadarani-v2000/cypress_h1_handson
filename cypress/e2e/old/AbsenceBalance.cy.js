/// <reference types= "cypress"/>
it("Check Absence Balance", ()=>{
    cy.fixture('AbsenceBalance').then((allData)=>{
        cy.visit("");
        allData.forEach((eachData,index) => {
//**********************************************Login Page**********************************************************
            cy.get('[aria-label = "User ID"]').clear().type(eachData.username); //UserName - HTML Attribute selector
            cy.xpath('//input[@id="password" or @type="password"]').clear().type(eachData.password); //XPath selector
            cy.screenshot();
            cy.get('#btnActive').should('be.visible').click(); //Submit Button - CSS Selector begins with
            if(index == 0)
            {
                cy.contains('You have a new home page!').should('have.text','You have a new home page!').click(); //Navigate to Home Page - Visible Text
            }
//***********************************************Absence Balance****************************************************
            cy.get('#itemNode_my_information_absences1_0').click(); //Click on "Time and absences" - ID selector
            cy.get("div[id='_FOpt1:_FOr1:0:_FONSr2:0:_FOTsr1:0:lp1Upl:UPsp1:i2:4:tb1:TBpgl1']").click(); //Absence Balance
            // cy.get('.kioskPanelSubHeader').should('have.text',eachData.employee);
            cy.screenshot();
            cy.contains(eachData.type).click(); //select PTO
            cy.get('span[class="xnd"]').first().should('have.text', eachData.balance); //Absence balance
            cy.screenshot();
//***********************************************Log out Balance****************************************************
            cy.xpath("//div[@id='_FOpt1:_UISpb1']").click(); //Profile
            cy.get("a[id='_FOpt1:_UISlg1']").click({force:true}); //Sign Out
            cy.xpath("//button[@id='_FOpt1:_FOr1:0:_FONSr2:0:MAyes']").click(); //Yes button
            // cy.screenshot();
            cy.get("#Confirm").click();
    })
})
})