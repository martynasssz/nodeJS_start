
const express = require('express'); // import express js
const bodyParser = require('body-parser');

const app = express(); //create an express application and store in a constant app like function

app.use(bodyParser.urlencoded({extended:false})); //extended:false, because it shoud be parse non-default features

app.use('/add-product', (req, res, next) => {     
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');     
}); 

//middleware thats handles requests to product
// if we use post, this middlewave will be trigger for incoming post request with this path

app.post('/product', (req, res, next) => { 
    //redirect and log to console
    console.log(req.body); //req.body a new fied added by express //extracting what user has send
    res.redirect('/'); //redirect to slash route after submit pressing
});

app.use('/', (req, res, next) => { //use() method defined be expressjs, it's allows to add new middleware function    
    res.send('<h1>Hello from Express</h1>'); // send allow to send a response
}); 

//use only this offered by expressjs framework insteand const server and sever.listen(3000)
app.listen(3000); //set up server