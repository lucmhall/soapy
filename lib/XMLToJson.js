const { DOMParser } = require('xmldom');

// add attributes to json conditionally by reference
const getAttributes = (node, json) => {
  const attributes = {};

  if (node.attributes) {
    Object.keys(node.attributes).forEach((attrIdx) => {
      const { nodeName, nodeValue } = node.attributes[attrIdx];
      // make sure we arent at an empty final node.
      if (nodeName !== undefined && nodeValue !== null) {
        attributes[nodeName] = nodeValue;
      }
    });
    // only put if has values
    if (Object.keys(attributes).length) {
      /* eslint-disable no-param-reassign */
      json.attributes = attributes;
    }
  }
};

const getChildNodes = (node, json) => {
  const childNodes = [];

  if (Object.keys(node.childNodes)) {
    Object.keys(node.childNodes)
    // make sure we dont get undefined nodes
      .filter(idx => node.childNodes[idx].nodeName)
    /*
     we use idx because its a Object of index keys
     { 0: {}, 1: {} ...}
    */
    .forEach((idx) => {
      const iterNode = node.childNodes[idx];
      console.log(iterNode);
      childNodes.push(makeJson(iterNode));
      /*
       Define `children` ahead of time bc it might be undefined
       and only conditionally add if isnt undefined
       so that we dont get children: undefined
       in the return object
      */
    });
  }
  if (childNodes.length) {
    json.children = childNodes;
  }
};

// XMLDOM has some oddities. Conditionals in place to tame.
const makeJson = (node) => {
  /*
    Some nodes in the xmldom end up being undefined
    or stubs of parent/sibling nodes
    just ignore them.
  */

  if (node && node.nodeName) {
    const json = {
      name: node.nodeName,
    };

    getAttributes(node, json);
    getChildNodes(node, json);

    return json;
  }
};

const XMLtoJson = (xml) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(xml, 'text/xml');

  // console.log(document);
  if (document.childNodes) {
    // idx keyed object { 0: {}, 1: {} }
    return Object.keys(document.childNodes)
      .filter(idx => document.childNodes[idx].nodeName)
      .map(idx => makeJson(document.childNodes[idx]));
  }
  return makeJson(document);
};

module.exports = XMLtoJson;
