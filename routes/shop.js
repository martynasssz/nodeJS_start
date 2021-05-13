const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop'); //import product controller

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get("/products/:productId", shopController.getProduct); //: // this signals to express that it should not look for a route like products product ID but instead that this part here can be anything

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;
