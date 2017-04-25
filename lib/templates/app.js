module.exports = `const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');

const jsonToXML = require('./lib/jsonToXML');
{{#each serviceNames}}
const {{this}} = require('./{{{this}}}');
{{/each}}

const app = express();
soap.createClient('{{{wsdl}}}', (err, soapClient) => {
  if (err) {
    console.log('Error connecting to WSDL', err);
  } else {
    app.use((req, res, next) => {
      req.soapClient = soapClient;
      next();
    });
    app.use(bodyParser.json());

    // convert body to xml. must go after bodyparser
    app.use((req, res, next) => {
      if (req.body) {
        req.xml = jsonToXML(req.body);
      }
      next();
    });
    {{#each serviceNames}}
    app.use('/{{{this}}}', {{this}});
    {{/each}}

    app.get('/', (req, res) => {
      res.send('hai!');
    });
    app.listen(3000);
  }
});


`;
