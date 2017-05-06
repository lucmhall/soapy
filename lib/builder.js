const compilers = require('./compilers');
const path = require('path');
const fs = require('fs');
const { findOperationsAndType } = require('./soapHelpers');

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

const appBuilder = (baseDir, wsdlUrl, portNames) => {
  const fileName = path.join(baseDir, 'app.js');
  const appFile = compilers.app({ wsdlUrl, portNames });

  fs.writeFile(fileName, appFile, (writeErr) => {
    if (writeErr) {
      // eslint-disable-next-line no-console
      console.error(writeErr);
    }
  });
};

const portBuilder = (baseDir, bindings) => {
  const portName = bindings.attributes.name;
  const portNameDir = path.join(baseDir, portName);

  if (!fs.existsSync(portNameDir)) {
    fs.mkdirSync(portNameDir);
  }

  const children = bindings.children
    .filter(child => typeof child === 'object');

  const { bindingType, operations } = findOperationsAndType(children);
  const fileName = path.join(portNameDir, 'index.js');
  const operationsFile = compilers.operationsFile({
    portName,
    bindingType,
    operations,
  });

  fs.writeFile(fileName, operationsFile, (writeErr) => {
    if (writeErr) {
      // eslint-disable-next-line no-console
      console.error(writeErr);
    }
  });
};


module.exports = { portBuilder, appBuilder, packageBuilder };
