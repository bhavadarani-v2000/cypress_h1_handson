import { sharedBeforeEach } from '../../support/BeforeEach_DeleteEntries';

describe('Expenses Page', () => {
    sharedBeforeEach(); 
    it('Cancel Button - no Currency Type', function () {
      cy.visit('');
      cy.contains('You have a new home page!').click();
      cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
      cy.get("svg[aria-label='Create']").click();
      cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
      cy.xpath("//input[@type='file']").attachFile('Expenses.json');
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptCurrencyCodeClientLov:sis1:is1::content']").clear(); //Currency
      cy.screenshot();
      cy.xpath("(//div[@class='xeq p_AFTextOnly'])[4]").should('be.visible').click();
      cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelGroupLayout3f']").should('have.text',this.data.b_cancel);
      cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelDialog3::yes']").click();
    });
    it('Cancel Button - All fields', function () {
        cy.visit('');
        cy.contains('You have a new home page!').click();
        cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
        cy.get("svg[aria-label='Create']").click();
        cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
        cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
        cy.xpath("//input[@type='file']").attachFile('Expenses.json');
        cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
        cy.reload(true);
        cy.screenshot();
        cy.xpath("//span[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:a1:dciAvsd:lvAvsd:0:otAvsddDiFile']").should('have.text', 'Expenses.json');
        cy.xpath("(//div[@class='xeq p_AFTextOnly'])[4]").should('be.visible').click();
        cy.xpath("//span[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:panelGroupLayout3f']").should('have.text',this.data.b_cancel);
        cy.xpath("//button[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:panelDialog3::yes']").click();
    });        
    it('Cancel Button - no type', function () {
      cy.visit('');
      cy.contains('You have a new home page!').click();
      cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
      cy.get("svg[aria-label='Create']").click();
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
      cy.xpath("(//div[@class='xeq p_AFTextOnly'])[4]").should('be.visible').click();
      cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelGroupLayout3f']").should('have.text',this.data.b_cancel);
      cy.screenshot();
      cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelDialog3::yes']").click();
    });
    it('Cancel Button - no date', function () {
      cy.visit('');
      cy.contains('You have a new home page!').click();
      cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
      cy.get("svg[aria-label='Create']").click();
      cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
      cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
      cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate']").clear();
      cy.screenshot();
      cy.xpath("(//div[@class='xeq p_AFTextOnly'])[4]").should('be.visible').click();
      cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelGroupLayout3f']").should('have.text',this.data.b_cancel);
      cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelDialog3::yes']").click();
    });
    it('Cancel Button - no Currency Value', function () {
      cy.visit('');
      cy.contains('You have a new home page!').click();
      cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
      cy.get("svg[aria-label='Create']").click();
      cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
      cy.xpath("(//div[@class='xeq p_AFTextOnly'])[4]").should('be.visible').click();
      cy.screenshot();
      cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelGroupLayout3f']").should('have.text',this.data.b_cancel);
      cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelDialog3::yes']").click();
    });
  });
  