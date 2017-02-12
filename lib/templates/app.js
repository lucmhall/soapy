module.exports = `
const app = express();

app.get('/:service/:port/:method', (req, res) => {
  const { service, port, method } = req.params;

  // console.log(client, service, );
  console.log(client[service][port][method]());
  res.send();
});
app.listen(3000);
`;
