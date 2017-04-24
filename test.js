const jsonToXML = require('./lib/jsonToXML');
const XMLToJson = require('./lib/XMLToJson');


const xml = jsonToXML([
  {
    name: 'p',
    attributes: { fizz: 'buzz' },
    children: {
      name: 'a',
      attributes: { b: '2' },
    },
  },
  {
    name: 'pa',
    attributes: { foo: 'bar' },
    children: 'text123',
  },
]);

console.log(xml);
const json = XMLToJson(xml);

console.log(json);


