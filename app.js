const http = require('http'); //looks for a global module //imported

const express = require('express'); // import express js

const app = express(); //create an express application and store in a constant app like function

app.use((req, res, next) => { //use() method defined be expressjs, it's allows to add new middleware function
    console.log('In the middleware');
    next(); //Allows the request to continue to the next middleware in line
}); 

app.use((req, res, next) => { //use() method defined be expressjs, it's allows to add new middleware function
    console.log('In another middleware');
}); 

const server = http.createServer(app); //app here actually happens to be a valid request hendler,so we pass app to create a server
//const server = http.createServer(routes);
 
server.listen(3000);