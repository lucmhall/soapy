# soapy
Generates a proxy RESTful Service for a SOAP service using a Expressjs

This project is being completed as a part of a thesis project. It is a work in progress.


- Next TODO(s)
  * Handle parsing of JSON -> XML. 
    * It appears the soap package being used for connecting to a service provides this in some capacity but Id prefer to do this on my own.
    * One possibility is to generate a handlebars files that generate the XML to make an explicit mapping. However, this could raise an issue if the service updates. 

  * Create mechanism for updating the generated proxy service when the soap service changes. 
    * Can this be easily detected with some version number?
    * One big plus of creating the proxy service as a real web service is so that it can be customized and integrated into existing Express.js Apps. How could we upgrade if changes are made?
    