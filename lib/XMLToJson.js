const { DOMParser } = require('xmldom');


const makeJson = (document) => {
  if (document && document.childNodes) {
    return Object.keys(document.childNodes)
    .filter(idx => document.childNodes[idx].nodeName)
    .map((idx) => {
      const node = document.childNodes[idx];
      const attributes = {};
      if (node.attributes) {
        Object.keys(node.attributes).forEach((attrIdx) => {
          const { nodeName, nodeValue } = node.attributes[attrIdx];
          if (nodeName !== undefined && nodeValue !== null) {
            attributes[nodeName] = nodeValue;
          }
        });
      }
      /*
       Define `children` ahead of time bc it might be undefined
       and only conditionally add if isnt undefined
       so that we dont get children: undefined
       in the return object
      */
      const children = makeJson(node.childNodes);

      const ret = {
        name: node.nodeName,
        attributes,
      };
      if (children) {
        ret.children = children;
      }

      return ret;
    });
  }
};

const XMLtoJson = (xml) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xml, 'text/xml');

  return makeJson(document);
};

module.exports = XMLtoJson;
