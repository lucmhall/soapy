module.exports = `
const express = require('express');
const router = express.Router();

const service = '{{{serviceName}}}';
const port = '{{{portName}}}';

{{{methods}}}

module.exports = router;

//yay!
`;

