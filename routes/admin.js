const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = []; //product array

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  //take product and push a new element into this array, a new object
  products.push({title: req.body.title}); //object has a title and request body, extract title with dot notation
  res.redirect('/');
});

//export products and router
exports.routes = router;
exports.products = products; 
