const compilers = require('./compilers');
const path = require('path');
const fs = require('fs');
const { baseDir } = require('../config');

function portBuilder(port) {
  return Object.keys(port).map(methodName => compilers.method({ methodName })).join('\n');
}

function serviceBuilder(serviceName, ports) {
  const serviceDir = path.join(baseDir, serviceName);

  if (!fs.existsSync(serviceDir)) {
    fs.mkdirSync(serviceDir);
  }
  if (!fs.existsSync(path.join(serviceDir, 'methods'))) {
    fs.mkdirSync(path.join(serviceDir, 'methods'));
  }

  return Object.keys(ports).map(portName => ({
    serviceName,
    portName,
    methods: portBuilder(ports[portName]),
  }));
}


module.exports = { serviceBuilder, portBuilder };
