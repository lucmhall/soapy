module.exports = `const express = require('express');
const bodyParser = require('body-parser');

const jsonToXML = require('./lib/jsonToXML');
{{#each portNames}}
const {{this}} = require('./{{{this}}}');
{{/each}}

const app = express();
  
app.use((req, res, next) => {
  // inject necessary soap params here
  next();
});

app.use(bodyParser.json());

// convert body to xml. must go after bodyparser
app.use((req, res, next) => {
  if (Object.keys(req.body).length) {
    req.targetNamespace = '{{{targetNamespace}}}';
  }
  next();
});

{{#each portNames}}
app.use('/{{{this}}}', {{this}});
{{/each}}

app.get('/', (req, res) => {
  res.send('hai!');
});
app.listen(3000);




`;
