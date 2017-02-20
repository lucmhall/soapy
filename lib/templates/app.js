module.exports = `const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');

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
