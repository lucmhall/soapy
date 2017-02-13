const compilers = require('./compilers');
const path = require('path');
const fs = require('fs');
const { baseDir } = require('../config');

function portBuilder(port) {
  return Object.keys(port);
}

function serviceBuilder(serviceName, ports) {
  const serviceDir = path.join(baseDir, serviceName);

  if (!fs.existsSync(serviceDir)) {
    fs.mkdirSync(serviceDir);
  }
  if (!fs.existsSync(path.join(serviceDir, 'methods'))) {
    fs.mkdirSync(path.join(serviceDir, 'methods'));
  }

  Object.keys(ports).map((portName) => {
    const preparedService = {
      serviceName,
      portName,
      methods: portBuilder(ports[portName]),
    };
    const serviceFileText = compilers.methodRoute(preparedService);
    const portMethodFileName = path.join(
      baseDir, serviceName, 'methods', `${preparedService.portName}.js`);

    fs.writeFile(portMethodFileName, serviceFileText, (writeErr) => {
      if (writeErr) {
        return console.error(writeErr);
      }
    });
  });

  // create index file for port passthrough
  const portIndexFileName = path.join(baseDir, serviceName, 'index.js');
  const portNames = compilers.portIndex({ ports: Object.keys(ports) });

  fs.writeFile(portIndexFileName, portNames, (writeErr) => {
    if (writeErr) {
      return console.error(writeErr);
    }
  });
}


module.exports = { serviceBuilder, portBuilder };
