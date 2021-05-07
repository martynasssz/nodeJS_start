const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin'); //import product controller ..means up one level

//const rootDir = require('../util/path'); //remove because we don't usi in more

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct); //productsController.getAddProduct pass referent to get function, not a function
// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct );

router.get('/edit-product/:productId', adminController.getEditProduct);


module.exports = router; //export router as we do in shop.js file
