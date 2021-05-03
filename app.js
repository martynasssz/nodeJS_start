const path = require('path');

const express = require('express'); // import express js
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars'); //import express handlebars

const app = express(); //create an express application and store in a constant app like function

app.engine( // tell express that this engine we can use
    'hbs',  //this registers a new template engine with extension hbs
    expressHbs({
        layoutsDir: 'views/layouts/', // expressHbs({layoutsDir}) set out where lives
        defaultLayout: 'main-layout',
        extname: 'hbs' // which only appliesto the layouts and not to all files
        }));  

app.set('view engine', 'hbs'); //swith the view egine to hanglebars // registeres a shbs
app.set('views', 'views');

const adminData = require('./routes/admin'); //import admin data
const shopRoutes = require('./routes/shop'); //import admin routes

app.use(bodyParser.urlencoded({extended:false})); //extended:false, because it shoud be parse non-default features
app.use(express.static(path.join(__dirname,'public'))); //user should be able access the public pathadd


//outsources routes
app.use('/admin', adminData.routes); //adminRoutes changed to adminData.routes because in admin js rewrite exports.routes = router;
app.use(shopRoutes);

app.use((req, res, next) => { // catch all middleware //without path filter
    res.status(404).render('404', {pageTitle: 'Page Not Found'}); //instead sendFile
});

//use only this offered by expressjs framework insteand const server and sever.listen(3000)
app.listen(3000); //set up server