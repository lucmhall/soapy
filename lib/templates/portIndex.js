module.exports = `const express = require('express');

const router = express.Router();

{{#each ports}}
const {{this}} = require('./methods/{{this}}.js');
{{/each}}

{{#each ports}}
router.use('/{{this}}', {{this}});
{{/each}}

module.exports = router;
`;
