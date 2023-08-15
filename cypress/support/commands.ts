/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */

import { loginCommand } from "./commands/login";

Cypress.Commands.add('login', (login, password) => { });

declare global {
  namespace Cypress {
    interface Chainable {
      login(login: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add(
  'login',
  loginCommand,
);

// https://stackoverflow.com/a/59499895/20288187
export {};
