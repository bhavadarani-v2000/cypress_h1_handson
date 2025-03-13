describe('Login', () => {
  it.skip('MySQL DB Connection', () => {
    cy.visit('/');
    // alter user 'root'@'localhost' identified with mysql_native_password by 'root';
    // flush privileges;
    cy.task("queryDb","select * from world.creds;").then(res => {
      var rec = res; 
      const results = Object.values(rec[0]);
      cy.get('[aria-label = "User ID"]').clear().type(results[0]); 
      cy.xpath('//input[@id="password" or @type="password"]').clear().type(results[1]);
      cy.get('#btnActive').should('be.visible').click();
    })
  });

})