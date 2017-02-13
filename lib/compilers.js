/* eslint-disable global-require*/
const Handlebars = require('handlebars');

module.exports = {
  method: Handlebars.compile(require('./templates/method')),
  methodRoute: Handlebars.compile(require('./templates/methodRoute')),
  portIndex: Handlebars.compile(require('./templates/portIndex')),
  package: Handlebars.compile(require('./templates/package')),
  app: Handlebars.compile(require('./templates/app')),
};
