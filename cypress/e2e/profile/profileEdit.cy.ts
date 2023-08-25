import { User } from '@/entities/User';

const userData: Partial<User> = {
  login: 'admin',
  firstName: 'misha',
  lastName: 'admin',
  phone: '+375446577833',
  email: 'sdfsd@gmail.com'
};

describe('Edit profile', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login('admin', '12345').then((user) => {
      cy.visit(`user/${user.login}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(userData);
  });

  it('should be on profile page', () => {
    cy.selectByTestId('ProfilePage').should('exist');
  });

  it('should update profile', () => {
    const newFirstName = 'New First name';
    const newLastName = 'New Last name';

    cy.updateProfile(newFirstName, newLastName);
    cy.selectByTestId('EditableProfileCard.firstNameInput').should('have.value', newFirstName);
    cy.selectByTestId('EditableProfileCard.lastNameInput').should('have.value', newLastName);
  });
});
