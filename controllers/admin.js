const Product = require('../models/product'); //importing Product class

exports.getAddProduct = (req, res, next) => { //we get the add-product page //help to get add-product
    res.render('admin/edit-product', { //new path to view
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        .then(result => {
            // console.log(result);
            console.log('Created Product');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => { //we get the add-product page //help to get add-product
    /*check query parameters*/
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
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
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
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
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; //extract the product ID from the request body by accessing product ID    
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};