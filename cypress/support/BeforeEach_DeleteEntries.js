// cypress/support/sharedSetup.js
export function sharedBeforeEach() {
    beforeEach(function () {
      cy.fixture('Expenses').then(function (data) {
        this.data = data;
      });
      cy.session('login', () => {
        cy.visit('');
        cy.get('[aria-label="User ID"]').clear().type(this.data.username);
        cy.xpath('//input[@id="password" or @type="password"]').clear().type(this.data.password);
        cy.xpath("//button[@id='btnActive']").should('be.visible').click();
        cy.contains('You have a new home page!').click();
        cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
      });
    });
  }
export function Delete_Entries() {
  it('Delete entries',function(){
    cy.visit('');
    cy.contains('You have a new home page!').click();
    cy.xpath("//div[@id='itemNode_my_information_expenses']").should('be.visible').click();
    cy.get("span[class='x17e']").each(($el, index, $list) => {
      if (index !== 0 && index !== $list.length - 1) {
        cy.log(`Clicking element at index: ${index}`);
        cy.wrap($el).should('be.visible').click({ force: true });
      }
      else{ return; }
    });
    cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:cb291']").should('be.enabled');
    cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:cb291']").click({force:true}); //drop down
    cy.xpath("(//td[@class='xo0'])[11]").click(); //Delete expense
    cy.xpath("//button[@id='pt1:_FOr1:1:_FONSr2:0:_FOTsr1:0:pt0:pt12:r2:0:d1::yes']").click();// Yes button
  });}
  export function printTimeCard() {
      cy.fixture('Expenses').then(function (data) {
        this.data = data;
      cy.visit('');
      // Login
      cy.get('[aria-label="User ID"]').clear().type(this.data.username);
      cy.xpath('//input[@id="password" or @type="password"]').clear().type(this.data.password);
      // cy.screenshot();
      cy.xpath("//button[@id='btnActive']").should('be.visible').click();
      // Navigate through the app
      cy.contains('You have a new home page!').click();
      cy.xpath("//a[@id='pt1:_UISmmLink']").should('be.visible').click({ force: true });
      cy.xpath("//div[@id='pt1:_UISnvr:0:nvgpgl2_groupNode_my_information']//div[1]").click();
      cy.get("a[id='pt1:_UISnvr:0:nvd_c_3f49aba518c2475fb6e7cff6ecb98859']").invoke('removeAttr','target').click();
      cy.xpath("//div[@id='xdo:headerTabTitle']").should('contain', 'Employee Monthly Time Sheet Report');
    });
}