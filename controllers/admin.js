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
    const product = new Product(null, title, imageUrl, price, description); //product will be created with all data: (null, title, imageUrl, price, description) //null as first argument
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
   const prodId =  req.body.productId;
   const updatedTitle = req.body.title;
   const updatedPrice = req.body.price;
   const updatedImageUrl = req.body.imageUrl;
   const updatedDesc = req.body.description;
   const updatedProduct = new Product (
       prodId, 
       updatedTitle, 
       updatedImageUrl, 
       updatedDesc, 
       updatedPrice
    );
    updatedProduct.save();
    res.redirect('/admin/products');
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

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; //extract the product ID from the request body by accessing product ID    
    Product.deleteById(prodId);
    res.redirect('/admin/products');  
};