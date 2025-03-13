import { sharedBeforeEach, Delete_Entries } from '../../support/BeforeEach_DeleteEntries';

describe('Expenses Page', () => {
  sharedBeforeEach();
    it('Create Another Button - no date', function () {
        cy.visit('');
        cy.contains('You have a new home page!').click();
        cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
        cy.get("svg[aria-label='Create']").click();
        cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
        cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
        cy.xpath("//input[@type='file']").attachFile('Expenses.json');
        cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate']").clear();
        cy.xpath("//div[@class='AFNoteWindowHintText']").should('be.visible').should('contain.text',this.data.no_date);
        cy.xpath("(//div[@class='xeq p_AFTextOnly'])[2]").should('be.visible').click();
        cy.screenshot();
        cy.xpath("//h1[@class='xnu ']").should('contain',this.data.b_done);
    });
    it('Create Another Button - no Currency Type', function () {
        cy.visit('');
        cy.contains('You have a new home page!').click();
        cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
        cy.get("svg[aria-label='Create']").click();
        cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
        cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptCurrencyCodeClientLov:sis1:is1::content']").clear(); //Currency
        cy.screenshot();
        cy.xpath("(//div[@class='xeq p_AFTextOnly'])[2]").should('be.visible').click();
        cy.xpath("//table[@class='x1my']").should('be.visible');
    });
    it('Create Another Button - no type', function () {
      cy.visit('');
      cy.contains('You have a new home page!').click();
      cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
      cy.get("svg[aria-label='Create']").click();
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
      cy.screenshot();
      cy.xpath("(//div[@class='xeq p_AFTextOnly'])[2]").should('be.visible').click();
      cy.xpath("//div[@class='x1mu']").should('have.text',this.data.no_type);
    });
    it('Create Another Button - no Currency Value', function () {
      cy.visit('');
      cy.contains('You have a new home page!').click();
      cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
      cy.get("svg[aria-label='Create']").click();
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
      cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
      cy.xpath("//input[@type='file']").attachFile('Expenses.json');     
      cy.reload(true);
      cy.screenshot();
      cy.xpath("(//div[@class='xeq p_AFTextOnly'])[2]").should('be.visible').click();
      cy.xpath("//input[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:ReceiptAmount::content']").should('be.visible').should('have.value','');
      cy.xpath("//input[@type='file']").should('be.empty');
    });
    it('Create Another Button - All fields', function () {
      cy.visit('');
      cy.contains('You have a new home page!').click();
      cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
      cy.get("svg[aria-label='Create']").click();
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
      cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
      cy.xpath("//input[@type='file']").attachFile('Expenses.json');
      cy.reload(true);
      cy.xpath("//span[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:a1:dciAvsd:lvAvsd:0:otAvsddDiFile']").should('be.visible').and('have.text', this.data.fxtr_file);
      cy.screenshot();
      cy.xpath("(//div[@class='xeq p_AFTextOnly'])[2]").should('be.visible').click();
      cy.xpath("//input[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:ReceiptAmount::content']").should('be.visible').should('have.value','');
      cy.xpath("//input[@type='file']").should('be.empty');
    });  
    Delete_Entries();
  });
  