
const express = require('express'); // import express js

const app = express(); //create an express application and store in a constant app like function

app.use('/', (req, res, next) => { //use() method defined be expressjs, it's allows to add new middleware function
    console.log('This always runs!');
    next(); 
});

app.use('/add-product', (req, res, next) => { 
    console.log('In another middleware1');
    res.send('<h1>The "add product" Page</h1>'); 
}); 

app.use('/', (req, res, next) => { //use() method defined be expressjs, it's allows to add new middleware function
    console.log('In another middleware');
    res.send('<h1>Hello from Express</h1>'); // send allow to send a response
}); 

//use only this offered by expressjs framework insteand const server and sever.listen(3000)
app.listen(3000); //set up server