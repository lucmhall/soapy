const jsonToXML = require('./lib/jsonToXML');
const XMLToJson = require('./lib/XMLToJson');


// const xml = jsonToXML([
//   { name: 'p', attributes: { fizz: 'buzz' }, children: { name: 'a', attributes: { b: '2' } } },
//   { name: 'pa', attributes: { foo: 'bar' } },
// ]);

// console.log(xml);
const json = XMLToJson('<p fizz="buzz"><a b="2">Hello</a></p><pa foo="bar"></pa>');

console.log(json[0].children);


