const compilers = require('./compilers');
const path = require('path');
const fs = require('fs');
const { findOperationsAndType, isObject } = require('./soapHelpers');


const packageBuilder = (baseDir, appName) => {
  const fileName = path.join(baseDir, 'package.json');
  const packageFile = compilers.package({ appName });

  fs.writeFile(fileName, packageFile, (writeErr) => {
    if (writeErr) {
      // eslint-disable-next-line no-console
      console.error(writeErr);
    }
  });
};

const appBuilder = (baseDir, wsdlUrl, portNames, definitions) => {
  const fileName = path.join(baseDir, 'app.js');
  const { targetNamespace } = definitions.attributes;

  const appFile = compilers.app({ wsdlUrl, portNames, targetNamespace });

  fs.writeFile(fileName, appFile, (writeErr) => {
    if (writeErr) {
      // eslint-disable-next-line no-console
      console.error(writeErr);
    }
  });
};

const portBuilder = (baseDir, bindings, serviceLocation) => {
  const portName = bindings.attributes.name;
  const portNameDir = path.join(baseDir, portName);

  if (!fs.existsSync(portNameDir)) {
    fs.mkdirSync(portNameDir);
  }

  const children = bindings.children
    .filter(isObject);

  const { bindingType, operations } = findOperationsAndType(children);
  const fileName = path.join(portNameDir, 'index.js');
  const operationsFile = compilers.operationsFile({
    portName,
    bindingType,
    operations,
    serviceLocation,
  });

  fs.writeFile(fileName, operationsFile, (writeErr) => {
    if (writeErr) {
      // eslint-disable-next-line no-console
      console.error(writeErr);
    }
  });
};


module.exports = { portBuilder, appBuilder, packageBuilder };
