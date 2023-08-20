/* eslint-disable @typescript-eslint/no-namespace */
import { selectByTestId as selectByTestIdUtil } from 'cypress/helpers/selectByTestId';
import { ACCESS_TOKEN_LOCALSTORAGE_KEY, REFRESH_TOKEN_LOCALSTORAGE_KEY } from '../../../src/shared/constant/localstorage';
import { User } from '../../../src/entities/User';

export const login = (login: string, password: string) => {
  cy.log(`Logging in as ${login}`);

  cy.request({
    method: 'POST',
    url: 'http://localhost:3005/api/auth/login',
    body: {
      login,
      password,
    },
  }).then(({ body }) => {
    Cypress.env('token', body.tokens.accessToken)
    window.localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, body.tokens.accessToken);
    window.localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, body.tokens.refreshToken);

    return body;
  });
};

export function selectByTestId(testId: string) {
  return cy.get(selectByTestIdUtil(testId));
}

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  const optionsObject = options[0];

  if (optionsObject === Object(optionsObject)) {
    optionsObject.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cypress.env('token')}`,
      'Access-Control-Expose-Headers': '*',
      ...optionsObject.headers,
    };

    return originalFn(optionsObject);
  }

  return originalFn(...options);
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(login: string, password: string): Chainable<User>
      selectByTestId(testId: string): Chainable<JQuery<HTMLElement>>
    }
  }
}
