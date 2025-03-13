import { sharedBeforeEach, Delete_Entries } from '../../support/BeforeEach_DeleteEntries';

describe('Expenses Page', () => {
	sharedBeforeEach();
	it('Add to Report Button - no date', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("//input[@type='file']").attachFile('Expenses.json');
		cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate']").clear();
		cy.xpath("//div[@class='AFNoteWindowHintText']").should('be.visible').should('contain.text', this.data.no_date);
		cy.xpath("(//span[@class='xrk'])[1]").should('be.visible').click();
		cy.screenshot();
		cy.xpath("//h1[@class='xnu ']").should('contain', this.data.b_done);
	});
	it('Add to Report Button - no Currency Type', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptCurrencyCodeClientLov:sis1:is1::content']").clear(); //Currency
		cy.xpath("(//span[@class='xrk'])[1]").should('be.visible').click();
		cy.xpath("//table[@class='x1my']").should('be.visible');
		cy.screenshot();
	});
	it('Add to Report Button - no type', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.screenshot();
		cy.xpath("(//span[@class='xrk'])[1]").should('be.visible').click();
		cy.get("div[class='x1mu'] span").should('have.text', "You must complete the required fields.");
	});
	it('Add to Report Button - no Currency Value', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("//input[@type='file']").attachFile('Expenses.json');
		cy.reload(true);
		cy.screenshot();
		cy.xpath("(//span[@class='xrk'])[1]").should('be.visible').click();
		cy.xpath("//span[@class='xnc']").should('be.visible').and('have.text', this.data.no_cur);
	});
	it('Add to Report Button - All fields', function() {
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
		cy.xpath("(//span[@class='xrk'])[1]").should('be.visible').click();
		cy.formatCurrency(this.data.amount).then((formattedAmount) => {
			cy.xpath("//span[@class='xnc']").should('contain.text', formattedAmount);
		});
	});
	Delete_Entries();
	it('Cancel Button - no Currency Type', function() {
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
		cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelGroupLayout3f']").should('have.text', this.data.b_cancel);
		cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelDialog3::yes']").click();
	});
	it('Cancel Button - All fields', function() {
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
		cy.xpath("//span[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:panelGroupLayout3f']").should('have.text', this.data.b_cancel);
		cy.xpath("//button[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:panelDialog3::yes']").click();
	});
	it('Cancel Button - no type', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[4]").should('be.visible').click();
		cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelGroupLayout3f']").should('have.text', this.data.b_cancel);
		cy.screenshot();
		cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelDialog3::yes']").click();
	});
	it('Cancel Button - no date', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate']").clear();
		cy.screenshot();
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[4]").should('be.visible').click();
		cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelGroupLayout3f']").should('have.text', this.data.b_cancel);
		cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelDialog3::yes']").click();
	});
	it('Cancel Button - no Currency Value', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[4]").should('be.visible').click();
		cy.screenshot();
		cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelGroupLayout3f']").should('have.text', this.data.b_cancel);
		cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:panelDialog3::yes']").click();
	});
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
	it('Create Another Button - no Currency Type', function() {
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
	it('Create Another Button - no type', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.screenshot();
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[2]").should('be.visible').click();
		cy.xpath("//div[@class='x1mu']").should('have.text', this.data.no_type);
	});
	it('Create Another Button - no Currency Value', function() {
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
		cy.xpath("//input[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:ReceiptAmount::content']").should('be.visible').should('have.value', '');
		cy.xpath("//input[@type='file']").should('be.empty');
	});
	it('Create Another Button - All fields', function() {
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
		cy.xpath("//input[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:ReceiptAmount::content']").should('be.visible').should('have.value', '');
		cy.xpath("//input[@type='file']").should('be.empty');
	});
	Delete_Entries();
	it('Done Button - All fields', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("//input[@type='file']").attachFile('Expenses.json');
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.reload(true);
		cy.xpath("//span[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:a1:dciAvsd:lvAvsd:0:otAvsddDiFile']").should('have.text', 'Expenses.json');
		cy.screenshot();
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[5]").should('be.visible').click();
		cy.xpath("//h1[@class='xnu ']").should('contain', this.data.b_done);
	});
	it('Done Button - no Currency Type', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("//input[@type='file']").attachFile('Expenses.json');
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptCurrencyCodeClientLov:sis1:is1::content']").clear();
		cy.screenshot();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptCurrencyCodeClientLov:sis1:is1::content']").clear();
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[5]").should('be.visible').click();
		cy.xpath("//table[@class='x1my']").should('be.visible');
	});
	it('Done Button - no type', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[5]").should('be.visible').click();
		cy.xpath("//h1[@class='xnu ']").should('contain', this.data.b_done);
		cy.screenshot();
	});
	it('Done Button - no date', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate']").clear();
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[5]").should('be.visible').click();
		cy.xpath("//h1[@class='xnu ']").should('contain', this.data.b_done);
		cy.screenshot();
	});
	it('Done Button - no Currency Value', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[5]").should('be.visible').click();
		cy.xpath("//h1[@class='xnu ']").should('contain', this.data.b_done);
		cy.screenshot();
	});
    it('Save and Close Button - no date', function () {
        cy.visit('');
        cy.contains('You have a new home page!').click();
        cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
        cy.get("svg[aria-label='Create']").click();
        cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
        cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
        cy.xpath("//input[@type='file']").attachFile('Expenses.json');
        cy.xpath("//span[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate']").clear();
        cy.xpath("//div[@class='AFNoteWindowHintText']").should('be.visible').should('contain.text',this.data.no_date);
        cy.xpath("(//div[@class='xeq p_AFTextOnly'])[3]").should('be.visible').click();
        cy.screenshot();
        cy.xpath("//h1[@class='xnu ']").should('contain',this.data.b_done);
    });
	it('Save and Close Button - no type', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[3]").should('be.visible').click();
		cy.xpath("//td[@class='x1n1']").should('have.text', this.data.no_type);
		cy.screenshot();
	});
	it('Save and Close Button - no Currency Value', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("//input[@type='file']").attachFile('Expenses.json');
		cy.screenshot();
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[3]").should('be.visible').click();
		cy.contains(this.data.date).should('have.text', this.data.date);
	});
	it('Save and Close Button - no Currency Type', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptCurrencyCodeClientLov:sis1:is1::content']").clear(); //Currency
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[3]").should('be.visible').click();
		cy.xpath("//table[@class='x1my']").should('be.visible');
		cy.screenshot();
	});
	it('Save and Close Button - All fields', function() {
		cy.visit('');
		cy.contains('You have a new home page!').click();
		cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
		cy.get("svg[aria-label='Create']").click();
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:StartDate::content']").clear().type(this.data.date);
		cy.xpath("//select[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ExpenseTypeId::content']").select(this.data.types);
		cy.xpath("//input[@type='file']").attachFile('Expenses.json');
		cy.xpath("//input[@id='pt1:_FOr1:1:_FONSr2:0:MAnt2:1:AP1:UPsp1:ReceiptAmount::content']").type(this.data.amount);
		cy.reload(true);
		cy.xpath("//span[@id='pt1:_FOr1:0:_FONSr2:0:MAnt2:0:AP1:UPsp1:a1:dciAvsd:lvAvsd:0:otAvsddDiFile']").should('be.visible').and('have.text', this.data.fxtr_file);
		cy.screenshot();
		cy.xpath("(//div[@class='xeq p_AFTextOnly'])[3]").should('be.visible').click();
	});
	Delete_Entries();
});