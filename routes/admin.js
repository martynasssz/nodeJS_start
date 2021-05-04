const path = require('path');

const express = require('express');

const productsController = require('../controllers/products'); //import product controller ..means up one level

//const rootDir = require('../util/path'); //remove because we don't usi in more

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct); //productsController.getAddProduct pass referent to get function, not a function

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct );

//export products and router
// no longer need export products in admin.js, because we no longer have that array

module.exports = router; //export router as we do in shop.js file
