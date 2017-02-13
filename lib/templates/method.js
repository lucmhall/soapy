module.exports = `
router.get('/{{{methodName}}}', (req, res, next) => {
  res.send('{{{methodName}}}');
});
`;
