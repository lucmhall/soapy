const fetch = require('isomorphic-fetch');
const jsonToXML = require('./jsonToXML');

const makeXMLBody = (body, targetNamespace, operationName) => jsonToXML({
  name: operationName,
  attributes: {
    xmlns: targetNamespace,
  },
  children: body,
});
const getSoap1Envelope = body => (
  `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      ${body}
    </soap:Body>
  </soap:Envelope>`
);

const getSoap12Envelope = body => (
  `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    ${body}
  </soap12:Body>
</soap12:Envelope>`
);

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

const postSOAP = (serviceLocation, SOAPAction, body, targetNamespace, operationName, isSoap12) => {
  const xmlBody = makeXMLBody(body, targetNamespace, operationName);

  const envelope = isSoap12 ?
    getSoap12Envelope(xmlBody) : getSoap1Envelope(xmlBody);

  console.log(envelope);

  return new Promise((res, rej) => {
    fetch(serviceLocation, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': envelope.length,
        SOAPAction,
      },
      body: envelope,
    })
    .then((...args) => handleResponse(rej, ...args))
    .then(res)
    .catch(rej);
  });
};

module.exports = { get, postSOAP };

