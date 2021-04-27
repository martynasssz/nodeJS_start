const http = require('http'); //looks for a global module //imported
const routes = require('./routes');

//we need send incoming request to route.js file

console.log(routes.someText); //example of multiple export
const server = http.createServer(routes.handler); //routes handle  //execution function what's stored in routes
//const server = http.createServer(routes);
 
server.listen(3000);