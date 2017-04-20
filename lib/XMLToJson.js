const { DOMParser } = require('xmldom');

const XMLtoJson = (xml) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xml, 'text/xml');
  const retJSON = {};

  return Object.keys(document.childNodes).map((idx) => {
    const childNode = document.childNodes[idx];
    
    return {
      nodeName: childNode.nodeName,
      attributes: (typeof childNode === 'object') ? Object.keys(childNode.attributes).map(attrIdx => (
        childNode.attributes[attrIdx]
      )) : undefined,
      // recurse here
      // children: childNode.childNodes,
    };
  });
  // return retJSON;
};

module.exports = XMLtoJson;
