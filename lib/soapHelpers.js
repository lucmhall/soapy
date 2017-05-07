const validNames = {
  definitions: ['wsdl:definitions', 'definitions'],
  bindings: ['wsdl:binding', 'binding'],
  soapBindings: ['soap:binding', 'soap12:binding'],
  soapOperations: ['soap:operation', 'soap12:operation'],
  operations: ['operation', 'wsdl:operation'],
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
  findOperationsAndType,
};
