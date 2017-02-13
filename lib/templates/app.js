module.exports = `const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hai!');
});
app.listen(3000);

`;
