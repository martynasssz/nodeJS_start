const Product = require('../models/product'); //importing Product class

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
  res.render('shop/cart', {
    path:'/cart',
    pageTitle: 'Your Cart' 
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { //render a view
    path: '/checkout', //pass some data where we set the path to /checkout
    pageTitle: 'Checkout' //set page title
  });
};
