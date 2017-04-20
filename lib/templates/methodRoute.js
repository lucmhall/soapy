module.exports = `
const express = require('express');
const router = express.Router();

const service = '{{{serviceName}}}';
const port = '{{{portName}}}';

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

