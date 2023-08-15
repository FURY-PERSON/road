import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from '../../../src/shared/constant/localstorage';

export const loginCommand = (login: string, password: string) => {
  cy.log(`Logging in as ${login}`);

  cy.request({
    method: 'POST',
    url: 'http://localhost:3005/api/auth/login',
    body: {
      login,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, body.tokens.accessToken);
    window.localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, body.tokens.refreshToken);

    cy.visit('/');
  });
};
