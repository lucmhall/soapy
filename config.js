const path = require('path');

const appName = 'soapy-app';
const baseDir = path.join(__dirname, '..', appName);
const wsdl = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl';

module.exports = {
  baseDir,
  wsdl,
  appName,
};
