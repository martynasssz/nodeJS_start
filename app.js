const path = require('path');

const express = require('express'); // import express js
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');

//const expressHbs = require('express-handlebars'); //import express handlebars

const app = express(); //create an express application and store in a constant app like function

app.set('view engine', 'ejs'); //swith the view egine to hanglebars // registeres a shbs
app.set('views', 'views');

const adminRoutes = require('./routes/admin'); //import admin data
const shopRoutes = require('./routes/shop'); //import admin routes

app.use(bodyParser.urlencoded({extended:false})); //extended:false, because it shoud be parse non-default features
app.use(express.static(path.join(__dirname,'public'))); //user should be able access the public path

//outsources routes
app.use('/admin', adminRoutes); //adminRoutes because changed export
app.use(shopRoutes);

app.use(errorController.get404); //get from error controller

//use only this offered by expressjs framework insteand const server and sever.listen(3000)
app.listen(3000); //set up server