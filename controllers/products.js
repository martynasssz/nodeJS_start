const products = []; //product array

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
    products.push({title: req.body.title}); //object has a title and request body, extract title with dot notation
    res.redirect('/');
  };

exports.getProducts = (req, res, next) => {
    //const products = adminData.products;  so products here doesn't have to be extracted from anywhere and again we will change this.
      res.render('shop', {  //pass, inject into template products
      prods: products, 
      pageTitle:'Shop1', 
      path:'/', 
      hasProducts: products.length > 0, // hasProducts: products.length > 0 for handlebars
      activeShop: true, //set true to ensure for this route, that active class is added
      productCSS: true,     
    }); //define what sould be our reponse  
  };


