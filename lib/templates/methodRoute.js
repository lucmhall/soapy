module.exports = `
const express = require('express');
const router = express.Router();

const service = '{{{serviceName}}}';
const port = '{{{portName}}}';
/*
POST http://localhost:3000/ndfdXML/ndfdXMLPort/LatLonListZipCode
{
 "zipCodeList": "91311"
}
response:
<?xml version='1.0'?><dwml version='1.0' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:noNamespaceSchemaLocation='http://graphical.weather.gov/xml/DWMLgen/schema/DWML.xsd'><latLonList>33.8682,-117.929</latLonList></dwml>"
*/
{{#each methods}}
router.get('/{{{this}}}', (req, res, next) => {
  res.send([service, port,'{{{this}}}'].join('/'));
});

router.post('/{{{this}}}', (req, res, next) => {
  req.soapClient[service][port]['{{{this}}}']({}, (err, result, raw, soapHeader) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
{{/each}}
module.exports = router;

//yay!
`;

