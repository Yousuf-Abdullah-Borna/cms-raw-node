/*
Title:A content management system to monitor links
Description: A RESTful API to monitor up or down time of user defined links
Date: 2.8.2021

*/


//dependencies
const http= require('http')
const {handleReqRes} = require('./helper/handleReqRes')



//app object - module scaffolding 

const app = {};

app.config={
    port:3000
};

app.createServer = ()=>{


    const server = http.createServer(app.handleReqRes);

    server.listen(app.config.port,()=>{

        console.log("server is ready !!")
    })

}

app.handleReqRes = handleReqRes;



app.createServer();





