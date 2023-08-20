/* eslint-disable @typescript-eslint/no-namespace */

import { User } from '../../../src/entities/User';

export const updateProfile = (firstName: string, lastName: string) => {
  cy.selectByTestId('EditableProfileCard.editButton').click();
  cy.selectByTestId('EditableProfileCard.firstNameInput').clear().type(firstName);
  cy.selectByTestId('EditableProfileCard.lastNameInput').clear().type(lastName);
  cy.selectByTestId('EditableProfileCard.saveButton').click();
};

export const resetProfile = (user: Partial<User>) => {
  cy.request({
    method: 'PUT',
    url: `http://localhost:3005/api/users/${user.login}`,
    body: user,
  }).then(({ body }) => body);
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName: string, lastName: string): Chainable<User>
      resetProfile(user: Partial<User>): Chainable<User>
    }
  }
}
