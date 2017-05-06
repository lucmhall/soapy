const fs = require('fs');
const path = require('path');

const { portBuilder, appBuilder, packageBuilder } = require('./lib/builder');
const communicate = require('./lib/communicate');
const soapHelpers = require('./lib/soapHelpers');
const { baseDir, wsdl: wsdlUrl, appName } = require('./config');
const XMLToJson = require('./lib/XMLToJson');

function fetchWSDL(urlWSDL) {
  communicate.get(urlWSDL)
    .then((rawWSDL) => {
      const wsdl = XMLToJson(rawWSDL);
      const bindings = soapHelpers.findBindings(wsdl);
      const portNames = [];
      const filesToMove = [
        'lib/jsonToXML.js',
        'lib/XMLToJson.js',
      ];

      // ensure main app dir exsits, move lib files
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
      }

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

      // generate port binding files
      bindings.forEach((binding) => {
        portNames.push(binding.attributes.name);

        return portBuilder(baseDir, binding);
      });

      // generate main app.js file
      appBuilder(baseDir, wsdl, portNames);

      // generate package.json
      packageBuilder(baseDir, appName);
    })
    // eslint-disable-next-line no-console
    .catch(console.log);
}

fetchWSDL(wsdlUrl);
