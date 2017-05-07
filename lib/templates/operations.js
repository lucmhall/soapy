module.exports = `
const express = require('express');
const router = express.Router();

const communicate = require('../lib/communicate');


const port = '{{{portName}}}';
const serviceLocation = '{{{serviceLocation}}}';

router.get('/', (req, res, next) => {
  res.send('Welcome to /{{{portName}}}');
});

{{#each operations}}
router.get('/{{{this.name}}}', (req, res, next) => {
  const action = '{{{this.action}}}';
  res.send([port,'{{{this.name}}}'].join('/'));
});

router.post('/{{{this.name}}}', (req, res, next) => {
  const action = '{{{this.action}}}';
  const name = '{{{this.name}}}';

  communicate
    .postSOAP(serviceLocation, action, req.body, req.targetNamespace, name)
    .then((resp) => {
      console.log('this is resp', resp);
      res.send(resp);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err.body._readableState.buffer.head.data);
    });
});
{{/each}}
module.exports = router;

//yay!
`;

