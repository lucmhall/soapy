const compilers = require('./compilers');
const path = require('path');
const fs = require('fs');
const { baseDir } = require('../config');
const { findOperationsAndType } = require('./soapHelpers');

function portBuilder(port) {
  return Object.keys(port);
}

function serviceBuilder(bindings) {
  const portName = bindings.attributes.name;
  const portNameDir = path.join(baseDir, portName);

  if (!fs.existsSync(portNameDir)) {
    fs.mkdirSync(portNameDir);
  }

  bindings.children
    .filter(child => typeof child === 'object')
    .forEach((child) => {
      const { bindingType, operations } = findOperationsAndType(child);
      const preparedService = {
        portName,
        bindingType,
        operations,
      };

      const indexFile = compilers.operationsFile(preparedService);

    });
  // Object.keys(ports).map((portName) => {

  //   const serviceFileText = compilers.methodRoute(preparedService);

  //   fs.writeFile(portMethodFileName, serviceFileText, (writeErr) => {
  //     if (writeErr) {
  //       return console.error(writeErr);
  //     }
  //   });
  // });

  // // create index file for port passthrough
  // const portIndexFileName = path.join(baseDir, serviceName, 'index.js');
  // const portNames = compilers.portIndex({ ports: Object.keys(ports) });

  // fs.writeFile(portIndexFileName, portNames, (writeErr) => {
  //   if (writeErr) {
  //     return console.error(writeErr);
  //   }
  // });
}


module.exports = { serviceBuilder, portBuilder };
