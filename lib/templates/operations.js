module.exports = `
const express = require('express');
const router = express.Router();

const port = '{{{portName}}}';
/*
POST http://localhost:3000/ndfdXML/ndfdXMLPort/LatLonListZipCode
{
 "zipCodeList": "91311"
}
response:
<?xml version='1.0'?><dwml version='1.0' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:noNamespaceSchemaLocation='http://graphical.weather.gov/xml/DWMLgen/schema/DWML.xsd'><latLonList>33.8682,-117.929</latLonList></dwml>"
*/
{{#each operations}}
router.get('/{{{this.name}}}', (req, res, next) => {
  const action = {{{this.action}}};
  res.send([port,'{{{this.name}}}'].join('/'));
});

router.post('/{{{this.name}}}', (req, res, next) => {

});
{{/each}}
module.exports = router;

//yay!
`;

