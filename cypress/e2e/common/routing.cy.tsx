describe('Routing', () => {
  describe('Logged out user', () => {
    it('logged out user base url', () => {
      cy.visit('/');
      cy.selectByTestId('LoginPage').should('exist');
    });

    it('logged out user news url', () => {
      cy.visit('/news');
      cy.selectByTestId('LoginPage').should('exist');
    });

    it('logged out user not found url', () => {
      cy.visit('/jkdnfgkjdfng');
      cy.selectByTestId('NotFoundPage').should('exist');
    });
  });

  describe('Logged in user', () => {
    beforeEach(() => {
      cy.login('admin', '12345');
    });

    it('logged out user base url', () => {
      cy.visit('/');
      cy.selectByTestId('MainPage').should('exist');
    });
    
    it('logged out user news url', () => {
      cy.visit('/news');
      cy.selectByTestId('NewsPage').should('exist');
    });
  });
});
