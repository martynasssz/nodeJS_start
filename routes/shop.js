const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
//access the products array
const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
  const product = adminData.products; //take product from admin data products 

  res.render('shop', {prods: product, docTitle:'Shop1'}); //pass, inject into template products
  //define what sould be our reponse
});

module.exports = router;
