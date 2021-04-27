const http = require('http'); //looks for a global module //imported

const express = require('express'); // import express js

const app = express(); //create an express application and store in a constant app like function

const server = http.createServer(app); //app here actually happens to be a valid request hendler,so we pass app to create a server
//const server = http.createServer(routes);
 
server.listen(3000);