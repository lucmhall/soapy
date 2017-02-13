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

    // ensure main app dir exsits
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }

    fs.writeFile(path.join(baseDir, 'package.json'), compilers.package({ appName }), (writeErr) => {
      if (writeErr) {
        return console.error(err);
      }
    });

    fs.writeFile(path.join(baseDir, 'app.js'), compilers.app(serviceNames), (writeErr) => {
      if (writeErr) {
        return console.error(err);
      }
    });

    // builds out all services
    serviceNames.forEach(sn => serviceBuilder(sn, description[sn]));
  });
}


fetchWSDL(wsdlUrl);
