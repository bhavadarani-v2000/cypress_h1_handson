/// <reference types= "cypress"/>

beforeEach(function(){
    cy.visit("/");
    cy.fixture('Expenses').then(function (data) {
        this.data = data;
    })
})


it("Expenses Claim Creation", function(){
//**********************************************Login Page**********************************************************
    cy.get('[aria-label = "User ID"]').clear().type(this.data.username); //UserName - HTML Attribute selector
    cy.xpath('//input[@id="password" or @type="password"]').clear().type(this.data.password); //XPath selector
    cy.screenshot();
    cy.get('button[type^="sub"]').should('be.visible').click(); //Submit Button - CSS Selector begins with
    cy.contains('You have a new home page!').should('have.text','You have a new home page!').click(); //Navigate to Home Page - Visible Text
//**********************************************Travel and Expenses Page**********************************************************
    cy.get('#itemNode_my_information_expenses_0').click(); //Click on "Expenses" - ID selector
    cy.get("h1[class='xnu ']").should('have.text',"Travel and Expenses");
    cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:ol8']").click(); //Click on "Create report" - ID selector
    cy.screenshot();
    cy.get("img[id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:c0012::icon']").click();//Click on "+ Create item" buton
//**********************************************Create Expense Item Page**********************************************************    
    cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:2:AP1:UPsp1:StartDate']").clear().type(this.data.date); //provide date from fixtures
    cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:2:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types); //provide Type of Expense from fixtures
    cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:2:AP1:UPsp1:ReceiptAmount::content']").clear().type(this.data.amount); //provide Amount of Expense from fixtures
//**********************************************Upload File**********************************************************
    cy.contains("Attachments").should('be.visible'); // Assertion
    cy.xpath("//input[@type='file']").attachFile('Expenses.json');
    cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:2:AP1:UPsp1:a1:dciAvsd:lvAvsd:0:otAvsddDiFile']").should('have.text','Expenses.json');
    cy.screenshot();
    cy.xpath("//td[@class='x357']").click(); //Save and Close
    cy.xpath("//a[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:ctb3::popEl']").click(); //Save drop down
    cy.get("td[class='xo0']").click({force:true}); //Save and Close
    cy.wait(5000);
    cy.screenshot();
    cy.xpath('//span[@class="text-normal-3 Apps3XLargeFontSize"]').should('have.text',this.data.alert);
    cy.xpath("//div[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:cnv1_overflow']").should('be.visible');
})
it("Expenses Claim Deletion", function(){
    //**********************************************Login Page**********************************************************
        cy.get('[aria-label = "User ID"]').clear().type(this.data.username); //UserName - HTML Attribute selector
        cy.xpath('//input[@id="password" or @type="password"]').clear().type(this.data.password); //XPath selector
        cy.get('button[type^="sub"]').should('be.visible').click(); //Submit Button - CSS Selector begins with
        cy.contains('You have a new home page!').should('have.text','You have a new home page!').click(); //Navigate to Home Page - Visible Text
    //**********************************************Travel and Expenses Page**********************************************************
        cy.get('#itemNode_my_information_expenses_0').click(); //Click on "Expenses" - ID selector
        if(cy.xpath("//div[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:it67:0:pgl21']").should('be.visible'))
        {
            cy.xpath("//img[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:it67:0:cl2::icon']").click();
            cy.contains("Delete").click({force:true}); //Delete button
            cy.get("td[class='x51']").first().should('have.text',"If you delete this expense report, the expense items included in this report will be available for you to add to future reports. Do you want to continue?"); //
            cy.get("span[class='xva']").first().click({force:true}); //Yes Button
        }
        cy.contains(this.data.date).should('have.text',this.data.date);
        cy.xpath("(//div[@class='x17e'])[2]").click({force:true}); //checkBox
        cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:cb291']").should('be.enabled');
        cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:cb291']").click({force:true}); //drop down
        cy.screenshot();
        cy.xpath("(//td[@class='xo0'])[11]").click(); //Delete expense
        cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:d1::yes']").click();// Yes button
        cy.xpath("//div[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:it67:0:pgl21']").should('not.exist');
        cy.screenshot();
    })