/*
* Title: handles the notfound
*/

const handler = require("../helper/handleReqRes")

const hadnler = {}

handler.notFoundHandler= (requestProperties, callback) =>{

    
    console.log(requestProperties)
    callback(404, {
        message:'This is a notfound url'
    })
}

module.exports = handler;