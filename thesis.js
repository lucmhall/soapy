const soap = require('soap');
const fs = require('fs');
const path = require('path');

const { serviceBuilder } = require('./lib/builder');
const { baseDir, wsdl: wsdlUrl } = require('./config');
const { methodRouteCompiler, portIndexCompiler } = require('./lib/compilers');

function fetchWSDL(wsdl) {
  soap.createClient(wsdl, (err, client) => {
    const description = client.describe();

    // ensure main app dir exsits
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }

    Object.keys(description).forEach((serviceName) => {
      const preparedServices = serviceBuilder(serviceName, description[serviceName]);
      const portIndexFileName = path.join(baseDir, serviceName, 'index.js');
      const portNames = portIndexCompiler({ ports: preparedServices.map(ps => ps.portName) });

      fs.writeFile(portIndexFileName, portNames, (writeErr) => {
        if (writeErr) {
          return console.error(err);
        }
      });
      preparedServices.forEach((preparedService) => {
        const serviceFileText = methodRouteCompiler(preparedService);
        const portMethodFileName = path.join(
          baseDir, serviceName, 'methods', `${preparedService.portName}.js`);
        fs.writeFile(portMethodFileName, serviceFileText, (writeErr) => {
          if (writeErr) {
            return console.error(err);
          }
        });
      });
    });
  });
}


fetchWSDL(wsdlUrl);
