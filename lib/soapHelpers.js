const validNames = {
  definitions: ['wsdl:definitions', 'definitions'],
  bindings: ['wsdl:binding', 'binding'],
  soapBindings: ['soap:binding', 'soap12:binding']
};

const findDefinitions = (wsdl) => {
  const arrWSDL = Array.isArray(wsdl) ? wsdl : [wsdl];
  let definitions;

  arrWSDL.forEach((node) => {
    if (validNames.definitions.includes(node.name)) {
      definitions = node;
    }
  });

  return definitions;
};

const findBindings = (wsdl) => {
  const definitions = findDefinitions(wsdl);
  const bindings = [];

  definitions.children.forEach((node) => {
    if (validNames.bindings.includes(node.name)) {
      // this is used to filter out HTTP bindings
      if (node.children.filter(n => validNames.soapBindings.includes(n.name)).length) {
        bindings.push(node);
      }
    }
  });
  return bindings;
};

module.exports = {
  findBindings,
};
