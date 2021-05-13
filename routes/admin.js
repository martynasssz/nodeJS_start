const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin'); //import product controller ..means up one level

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct); //productsController.getAddProduct pass referent to get function, not a function
// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct );

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct); //this will not receive any dynamic segment because it's a post request so data can be enclosed in the request we're sending

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router; //export router as we do in shop.js file
