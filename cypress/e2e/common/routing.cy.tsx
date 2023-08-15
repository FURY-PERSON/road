import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
  describe('Logged out user', () => {
    it('logged out user base url', () => {
      cy.visit('/');
      cy.get(selectByTestId('LoginPage')).should('exist');
    });

    it('logged out user news url', () => {
      cy.visit('/news');
      cy.get(selectByTestId('LoginPage')).should('exist');
    });

    it('logged out user not found url', () => {
      cy.visit('/jkdnfgkjdfng');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('Logged in user', () => {
    beforeEach(() => {
      cy.login('admin', '12345');
    })

    it('logged out user base url', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    
    it('logged out user news url', () => {
      cy.visit('/news');
      cy.get(selectByTestId('NewsPage')).should('exist');
    });
  });
});
