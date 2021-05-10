const Product = require('../models/product'); //importing Product class
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {   
    //fetch all products
     Product.fetchAll(products => { //use static method  
      res.render('shop/product-list', {  //pass, inject into template products // shop/product-list new path to view
        prods: products, 
        pageTitle:'All Products', 
        path:'/',       
      });         
    }); 
  };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {    
    res.render('shop/product-detail', {//passing product property  
      product: product,
      pageTitle: product.title, //et dinamicallyp product title
      path: '/products' //path which we want to mark in navigation
    });  
  }); 
 
}

//render index page
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => { //use static method  
    res.render('shop/index', {  //pass, inject into template products // render shop index.ejs
      prods: products,
      pageTitle:'Shop', 
      path:'/',      
    });         
  }); 
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
          );
        if (cartProductData) { //check if this given product is also stored in a cart
          cartProducts.push({productData: product, qty: cartProductData.qty}); //cart products push and I will add the product I'm currently looking at in this iteration of this loop.
        }   
      }
      res.render('shop/cart', { //render a view inside callback function
        path:'/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });  
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; //extract data
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  }); 
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId; //extract the product ID from the request body product ID
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });  
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { //render view
    path:'/orders',
    pageTitle: 'Your orders' 
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { //render a view
    path: '/checkout', //pass some data where we set the path to /checkout
    pageTitle: 'Checkout' //set page title
  });
};
