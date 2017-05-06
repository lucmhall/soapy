const soap = require('soap');
const fs = require('fs');
const path = require('path');

const { serviceBuilder } = require('./lib/builder');
const communicate = require('./lib/communicate');
const soapHelpers = require('./lib/soapHelpers');
const { baseDir, wsdl: wsdlUrl, appName } = require('./config');
const compilers = require('./lib/compilers');
const XMLToJson = require('./lib/XMLToJson');

function fetchWSDL(urlWSDL) {
  communicate.get(urlWSDL)
    .then((rawWSDL) => {
      const wsdl = XMLToJson(rawWSDL);
      const bindings = soapHelpers.findBindings(wsdl);


      bindings.forEach((binding) => {
        console.log(binding);
      });
      bindings.forEach(serviceBuilder);
    });
}
// function fetchWSDL(wsdl) {
//   soap.createClient(wsdl, (err, client) => {
//     const description = client.describe();
//     const serviceNames = Object.keys(description);

//     // ensure main app dir exsits
//     if (!fs.existsSync(baseDir)) {
//       fs.mkdirSync(baseDir);
//     }
//     const filesToMove = [
//       'lib/jsonToXML.js',
//       'lib/XMLToJson.js',
//     ];

//     if (!fs.existsSync(path.join(baseDir, 'lib'))) {
//       fs.mkdirSync(path.join(baseDir, 'lib'));
//     }

//     filesToMove.forEach((file) => {
//       fs.readFile(path.join(file), 'utf8', (readErr, contents) => {
//         if (!readErr) {
//           fs.writeFileSync(path.join(baseDir, file), contents);
//         }
//       });
//     });

//     fs.writeFile(path.join(baseDir, 'package.json'), compilers.package({ appName }), (writeErr) => {
//       if (writeErr) {
//         /* eslint-disable no-console */
//         return console.error(err);
//       }
//     });

//     fs.writeFile(path.join(baseDir, 'app.js'), compilers.app({ wsdl, serviceNames }), (writeErr) => {
//       if (writeErr) {
//         /* eslint-disable no-console */
//         return console.error(err);
//       }
//     });

//     // builds out all services
//     serviceNames.forEach(sn => serviceBuilder(sn, description[sn]));
//   });
// }


fetchWSDL(wsdlUrl);
