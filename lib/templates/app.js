module.exports = `const express = require('express');
{{#each this}}
const {{this}} = require('./{{{this}}}');
{{/each}}
const app = express();
{{#each this}}
app.use('/{{{this}}}', {{this}});
{{/each}}

app.get('/', (req, res) => {
  res.send('hai!');
});
app.listen(3000);
`;
