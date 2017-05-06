/* eslint-disable global-require*/
const Handlebars = require('handlebars');

module.exports = {
  operationsFile: Handlebars.compile(require('./templates/operations')),
  portIndex: Handlebars.compile(require('./templates/portIndex')),
  package: Handlebars.compile(require('./templates/package')),
  app: Handlebars.compile(require('./templates/app')),
};
