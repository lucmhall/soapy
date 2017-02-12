const Handlebars = require('handlebars');
const templates = require('./templates');

module.exports = {
  methodCompiler: Handlebars.compile(templates.method),
  methodRouteCompiler: Handlebars.compile(templates.methodRoute),
  portIndexCompiler: Handlebars.compile(templates.portIndex),
};
