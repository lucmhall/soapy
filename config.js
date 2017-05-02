const path = require('path');

const appName = 'soapy-app';
const baseDir = path.join(__dirname, '..', appName);
const wsdl = 'http://www.webservicex.net/usaddressverification.asmx?WSDL';

module.exports = {
  baseDir,
  wsdl,
  appName,
};
