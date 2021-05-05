const Product = require('../models/product'); //importing Product class

exports.getAddProduct = (req, res, next) => { //we get the add-product page //help to get add-product
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        formsCSS: true, 
        productCSS: true, 
        activeAddProduct: true 
    }); 
  };

exports.postAddProduct = (req, res, next) => { 
    // create a new object based on this class blueprint and that is what classes are in the end, they are blueprints.
      const product = new Product(req.body.title); //instentiate object
      product.save(); //use save method defined in Product class
    res.redirect('/');
  };

exports.getProducts = (req, res, next) => {   
    //fetch all products
      const products = Product.fetchAll(); //use static method  
    res.render('shop', {  //pass, inject into template products
      prods: products, 
      pageTitle:'Shop1', 
      path:'/', 
      hasProducts: products.length > 0, // hasProducts: products.length > 0 for handlebars
      activeShop: true, //set true to ensure for this route, that active class is added
      productCSS: true,     
    }); //define what sould be our reponse  
  };


