module.exports = `
const express = require('express');
const router = express.Router();

const service = '{{{serviceName}}}';
const port = '{{{portName}}}';

{{#each methods}}
router.get('/{{{this}}}', (req, res, next) => {
  res.send([service, port,'{{{this}}}'].join('/'));
});
{{/each}}
module.exports = router;

//yay!
`;

