const fetch = require('isomorphic-fetch');

const handleResponse = (rej, resp) => {
  if (!resp.ok) {
    rej(resp);
  }
  return resp.text();
};

const get = url => (
  new Promise((res, rej) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/xml',
      },
    })
      .then((...args) => handleResponse(rej, ...args))
      .then(res);
  })
);

const post = (url, body) => (
  new Promise((res, rej) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
      },
      body,
    })
    .then((...args) => handleResponse(rej, ...args))
    .then(res);
  })
);

module.exports = { get, post };

