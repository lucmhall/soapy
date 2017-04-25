const soap = require('soap');
const fs = require('fs');
const path = require('path');

const { serviceBuilder } = require('./lib/builder');
const { baseDir, wsdl: wsdlUrl, appName } = require('./config');
const compilers = require('./lib/compilers');

function fetchWSDL(wsdl) {
  soap.createClient(wsdl, (err, client) => {
    const description = client.describe();
    const serviceNames = Object.keys(description);

    console.log(client.wsdl);
    // ensure main app dir exsits
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    const filesToMove = [
      'lib/jsonToXML.js',
      'lib/XMLToJson.js',
    ];

    if (!fs.existsSync(path.join(baseDir, 'lib'))) {
      fs.mkdirSync(path.join(baseDir, 'lib'));
    }

    filesToMove.forEach((file) => {
      fs.readFile(path.join(file), 'utf8', (readErr, contents) => {
        if (!readErr) {
          fs.writeFileSync(path.join(baseDir, file), contents);
        }
      });
    });

    fs.writeFile(path.join(baseDir, 'package.json'), compilers.package({ appName }), (writeErr) => {
      if (writeErr) {
        /* eslint-disable no-console */
        return console.error(err);
      }
    });

    fs.writeFile(path.join(baseDir, 'app.js'), compilers.app({ wsdl, serviceNames }), (writeErr) => {
      if (writeErr) {
        /* eslint-disable no-console */
        return console.error(err);
      }
    });

    // builds out all services
    serviceNames.forEach(sn => serviceBuilder(sn, description[sn]));
  });
}


fetchWSDL(wsdlUrl);
