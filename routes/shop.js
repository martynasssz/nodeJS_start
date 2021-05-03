const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
//access the products array
const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products; //take product from admin data products 

  res.render('shop', {  //pass, inject into template products
    prods: products, 
    pageTitle:'Shop1', 
    path:'/', 
    hasProducts: products.length > 0, // hasProducts: products.length > 0 for handlebars
    activeShop: true, //set true to ensure for this route, that active class is added
    productCSS: true,
    //layout: false //special key that is understud by handlrbars //we don't use it
  }); //define what sould be our reponse  
});

module.exports = router;
