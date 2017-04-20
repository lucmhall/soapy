const buildAttributes = (attributes) => {
  const parsedAttr = Object.keys(attributes).map(attrName => (
    `${attrName.toLowerCase()}="${attributes[attrName]}"`
  )).join(' ');

  return ` ${parsedAttr}`;
};

// map json to xml
const jsonToXML = (json) => {
  let attributes = '';
  let children = '';
  let nodeName = json.name;

  // make sure is object
  console.log(typeof json, json);
  if (typeof json !== 'object') {
    throw new Error('bad value passed. (object) required');
  }

  if (json.attributes && typeof json.attributes === 'object') {
    attributes = buildAttributes(json.attributes);
  }

  const keys = Object.keys(json);

  // case where object is just 1 k/v pair, { x: 2 }
  if (!json.children && !json.attributes && keys.length === 1 && keys[0] !== 'name') {
    children = json[keys[0]];
    nodeName = keys[0];
  } else if (json.children) {
    if (Array.isArray(json.children)) {
      // needs loop
      children = json.children.map(jsonToXML).join('');
    } else if (typeof json.children === 'object') {
      children = jsonToXML(json.children);
    } else {
      children = json.children;
    }
  }

  return `<${nodeName.toLowerCase()}${attributes}>${children}</${nodeName.toLowerCase()}>`;
};



module.exports = jsonToXML;
