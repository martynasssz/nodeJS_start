const Product = require('../models/product'); //importing Product class

exports.getAddProduct = (req, res, next) => { //we get the add-product page //help to get add-product
    res.render('admin/edit-product', { //new path to view
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        editing: false     
    }); 
};

exports.postAddProduct = (req, res, next) => { 
    //make more structure way
    const title = req.body.title; //store in const title, we never overwrite value in this function
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    // create a new object based on this class blueprint and that is what classes are in the end, they are blueprints.
    const product = new Product(title, imageUrl, price, description); //product will be created with all data: (title, imageUrl, price, description)
    product.save(); //use save method defined in Product class
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => { //we get the add-product page //help to get add-product
    /*check query parameters*/
    const editMode = req.query.edit;  
    if(!editMode) {
        return res.redirect('/');        
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
          return res.redirect('/');  
        }
        res.render('admin/edit-product', { //new path to view        
            pageTitle: 'Edit Product', 
            path: '/admin/edit-product', 
            editing: editMode,
            product: product // pass product on a product key //pass product information into view
        });
    }); 
};

exports.postEditProduct = (req, res, next) => {

};

//check products and render my view
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => { //use static method  
        res.render('admin/products', {  //pass, inject into template products // render shop index.ejs
          prods: products,  
          pageTitle:'Admin Products', 
          path:'/admin/products',      
        });         
      }); 
};