const buildAttributes = (attributes) => {
  const parsedAttr = Object.keys(attributes).map(attrName => (
    `${attrName.toLowerCase()}="${attributes[attrName]}"`
  )).join(' ');

  return ` ${parsedAttr}`;
};


// map json to xml
const makeJson = (json) => {
  let attributes = '';
  let children = '';
  let nodeName = json.name;

  // make sure is object
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
      children = json.children.map(makeJson).join('');
    } else if (typeof json.children === 'object') {
      children = makeJson(json.children);
    } else {
      children = json.children;
    }
  }

  return `<${nodeName}${attributes}>${children}</${nodeName}>`;
};

const jsonToXML = (json) => {
  if (Array.isArray(json)) {
    return json.map(makeJson).join('');
  }
  return makeJson(json);
};

module.exports = jsonToXML;
