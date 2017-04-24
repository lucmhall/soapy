# soapy
Generates a proxy RESTful Service for a SOAP service using a Expressjs

This project is being completed as a part of a thesis project. It is a work in progress.


- Next TODO(s)
  * Implement json <-> xml in the controllers. 
    * How will we unwrap and wrap the methods
    * How will we properly handle hitting the endpoints?
    

  * Create mechanism for updating the generated proxy service when the soap service changes. 
    * Can this be easily detected with some version number?
    * One big plus of creating the proxy service as a real web service is so that it can be customized and integrated into existing Express.js Apps. How could we upgrade if changes are made?
    