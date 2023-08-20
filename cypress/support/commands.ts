import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';

Cypress.Commands.addAll(
  commonCommands,
);

Cypress.Commands.addAll(
  profileCommands,
);

// https://stackoverflow.com/a/59499895/20288187
export {};
