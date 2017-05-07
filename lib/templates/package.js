module.exports = `{
  "name": "{{{appName}}}",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "dependencies": {
    "express": "^4.14.1",
    "handlebars": "^4.0.6",
    "body-parser": "^1.16.1",
    "isomorphic-fetch": "^2.2.1"
  },
  "devDependencies": {
    "eslint": "^3.15.0",
    "eslint-config-airbnb": "^14.1.0",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-jsx-a11y": "^4.0.0",
    "eslint-plugin-react": "^6.9.0",
    "nodemon": "^1.11.0"
  },
  "scripts": {
    "test": "echo 'Error: no test specified' && exit 1",
    "start": "nodemon app.js"
  },
  "author": "",
  "license": "ISC"
}`;
