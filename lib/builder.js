const compilers = require('./compilers');
const path = require('path');
const fs = require('fs');
const { baseDir } = require('../config');
const { findOperationsAndType } = require('./soapHelpers');


function portBuilder(bindings) {
  const portName = bindings.attributes.name;
  const portNameDir = path.join(baseDir, portName);

  if (!fs.existsSync(portNameDir)) {
    fs.mkdirSync(portNameDir);
  }

  const children = bindings.children
    .filter(child => typeof child === 'object');

  const { bindingType, operations } = findOperationsAndType(children);

  const operationsFile = compilers.operationsFile({
    portName,
    bindingType,
    operations,
  });

    fs.writeFile(path.join(portNameDir, 'index.js'), operationsFile, (writeErr) => {
      if (writeErr) {
        return console.error(writeErr);
      }
    });

  // Object.keys(ports).map((portName) => {

  //   const serviceFileText = compilers.methodRoute(preparedService);


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


module.exports = { portBuilder };
