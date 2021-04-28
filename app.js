const path = require('path');

const express = require('express'); // import express js
const bodyParser = require('body-parser');

const app = express(); //create an express application and store in a constant app like function

const adminRoutes = require('./routes/admin'); //import admin routes
const shopRoutes = require('./routes/shop'); //import admin routes

app.use(bodyParser.urlencoded({extended:false})); //extended:false, because it shoud be parse non-default features
app.use(express.static(path.join(__dirname,'public'))); //user should be able access the public path


//outsources routes
app.use('/admin', adminRoutes); //admin is as a filter
app.use(shopRoutes);

app.use((req, res, next) => { // catch all middleware //without path filter
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); 
});

//use only this offered by expressjs framework insteand const server and sever.listen(3000)
app.listen(3000); //set up server