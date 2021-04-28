
const express = require('express'); // import express js

const adminRoutes = require('./routes/admin'); //import admin routes
const shopRoutes = require('./routes/shop'); //import admin routes

const bodyParser = require('body-parser');

const app = express(); //create an express application and store in a constant app like function

app.use(bodyParser.urlencoded({extended:false})); //extended:false, because it shoud be parse non-default features

// ---!!! Order ir matter! ---
app.use(adminRoutes); //not calling it like  function just the object itself, the router object we're exporting this file
app.use(shopRoutes);

//use only this offered by expressjs framework insteand const server and sever.listen(3000)
app.listen(3000); //set up server