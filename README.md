# soapy
Generates a proxy RESTful Service for a SOAP service using a Expressjs

This project is being completed as a part of a thesis project. It is a work in progress.

Currently, the project should work. Clone a copy, modify the config.js file, and run `npm start`. 

- Potential TODO(s)
  * Create mechanism for updating the generated proxy service when the soap service changes. 
    * Can this be easily detected with some version number?
    * One big plus of creating the proxy service as a real web service is so that it can be customized and integrated into existing Express.js Apps. How could we upgrade if changes are made?
    
