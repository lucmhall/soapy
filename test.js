const jsonToXML = require('./lib/jsonToXML');
const XMLToJson = require('./lib/XMLToJson');


const xml = jsonToXML([
  { name: 'p', attributes: { fizz: 'buzz' } },
  { name: 'pa', attributes: { foo: 'bar' } },
]);


const json = XMLToJson(xml);

console.log(json);


