const Product = require('../models/product'); //importing Product class

exports.getAddProduct = (req, res, next) => { //we get the add-product page //help to get add-product
    res.render('admin/add-product', { //new path to view
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

//check products and render my view
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => { //use static method  
        res.render('admin/products', {  //pass, inject into template products // render shop index.ejs
          pageTitle:'Admin Products', 
          path:'/admin/products',      
        });         
      }); 
};