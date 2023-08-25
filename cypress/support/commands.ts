import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as newsCommands from './commands/news';
import * as dormCommands from './commands/dorm';
import * as commentCommands from './commands/comment';

Cypress.Commands.addAll(commonCommands);

Cypress.Commands.addAll(profileCommands);

Cypress.Commands.addAll(newsCommands);

Cypress.Commands.addAll(dormCommands);

Cypress.Commands.addAll(commentCommands);

// https://stackoverflow.com/a/59499895/20288187
export {};
