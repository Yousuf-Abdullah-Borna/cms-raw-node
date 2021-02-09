/*
Title: contains the request and response handler object
*/

//dependencies

const url = require('url')
const {StringDecoder} = require('string_decoder')
const routes = require('../routes')
const {notFoundHandler} = require('../routeHandler/notFoundHandler')

//handler scaffolding 
const handler = {}


handler.handleReqRes =(req,res)=>{

    //parsing the url
  const parsedUrl = url.parse(req.url,true)
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'')
   const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;

  const requestProperties ={

    parsedUrl:parsedUrl,
    path:path,
    trimmedPath:trimmedPath,
    method:method,
    queryStringObject:queryStringObject,
    headersObject: headersObject
  }
   
const decoder = new StringDecoder('utf-8')
   let realData = '';


   const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

   chosenHandler(requestProperties, (statusCode,payload)=>{

      statusCode = typeof(statusCode) === 'number' ? statusCode: 500;
      payload = typeof(payload) === 'object' ? payload: {};

      const payloadString = JSON.stringify(payload)
      res.writeHead(statusCode)
      res.end(payloadString)

   });

   req.on('data', (buffer) =>{

      realData += decoder.write(buffer)
   })

   req.on('end', ()=>{

    realData += decoder.end()
    console.log(realData)
    
   })

   
}


//exporting the handler
module.exports = handler