const path = require('path');

const baseDir = path.join(__dirname, 'app');
const wsdl = 'http://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl';

module.exports = {
  baseDir,
  wsdl,
};
