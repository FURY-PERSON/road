describe('News List', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login('admin', '12345');
    cy.visit('/news');
  });

  it('should be on news list page', () => {
    cy.selectByTestId('NewsPage').should('exist');
  });
});
