module.exports = `
const express = require('express');
const router = express.Router();

const port = '{{{portName}}}';

router.get('/', (req, res, next) => {
  res.send('Welcome to /{{{portName}}}');
});

{{#each operations}}
router.get('/{{{this.name}}}', (req, res, next) => {
  const action = '{{{this.action}}}';
  res.send([port,'{{{this.name}}}'].join('/'));
});

router.post('/{{{this.name}}}', (req, res, next) => {
  res.send(req.xml);
});
{{/each}}
module.exports = router;

//yay!
`;

