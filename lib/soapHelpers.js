const validNames = {
  definitions: ['wsdl:definitions', 'definitions'],
  bindings: ['wsdl:binding', 'binding'],
  soapBindings: ['soap:binding', 'soap12:binding'],
  soapOperations: ['soap:operation', 'soap12:operation'],
  operations: ['operation', 'wsdl:operation'],
  services: ['service', 'wsdl:service'],
  addresses: ['soap:address', 'soap:address12'],
};

//helper method to see if node is object
const isObject = node => typeof node === 'object';

//search and find service location used as endpoint
const findServiceLocation = (definitions, binding) => {
  const service = definitions.children
    .filter(isObject)
    .find(node => validNames.services.includes(node.name));

  const port = service.children
    .filter(isObject)
    .find(node => node.attributes.binding === `tns:${binding}`);

  const address = port.children
  .filter(isObject)
  .find(node => validNames.addresses.includes(node.name));

  return address.attributes.location;
};

/* [
    { name: 'soap12:binding', attributes: [Object] },
    { name: 'wsdl:operation',
       attributes: [Object],
       children: [Object] }
    ]
    Takes this format and returns the soapbinding type and
    all operations separately.
*/
const formatOperation = (operation) => {
  const action = operation.children.find(child => validNames.soapOperations.includes(child.name));

  return {
    name: operation.attributes.name,
    action: action.attributes.soapAction,
  };
};

// split operations and type into seperate entities,
// used directly into a template to generate port/index.js
const findOperationsAndType = (operations) => {
  const foundOperations = [];
  let bindingType;

  operations.forEach((op) => {
    if (validNames.operations.includes(op.name)) {
      foundOperations.push(formatOperation(op));
    } else if (validNames.soapBindings.includes(op.name)) {
      bindingType = op.name;
    }
  });

  return { bindingType, operations: foundOperations };
};

// top level definition search
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

// finds all bindings
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
  isObject,
  findServiceLocation,
  findDefinitions,
  findBindings,
  findOperationsAndType,
};
