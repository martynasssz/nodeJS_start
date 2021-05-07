//adding the logic for fetching a cart from a file
const fs = require('fs');
const path = require('path'); //path helper to contruct a good path

const p = path.join(
    path.dirname(process.mainModule.filename), //root directory, in there we will have new data folder, in data folder store file products.json
    'data', 
    'cart.json' // in there we'll store an object that represents our cart
); 

module.exports = class Cart {
    //instead constructor use static method
    static addProduct(id, productPrice) {
        //Feth the previous cart
        fs.readFile(p, (err, fileContent) => { //(err, fileContent) call if we'll err or file content
            let cart = {product:[], totalPrice: 0};
            if (!err) {  //if we don't have an error then we know we got an existing cart
                cart = JSON.parse(fileContent); //we know that we will have a cart and now we can analyze it and add a product                
            }
            //Analyze the cart => Find existing product
            //!important! We'll loop through all the products and have a look at each of them, each prod, so in each product we'll have a look and we'll see if the product ID matches the ID of the product we try to add.
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
              );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new produc or increase quantity
            if (existingProduct) {
            /*important! if we have an existing product, then I want to create a new product and for this I'll create a new variable, updatedProduct and here in this if statement, so if we have an existing product, I'll use updated product
            and now next generation javascript with the object spread operator, I'll take all the properties of the existing product and add them to a new javascript object and then */
                updatedProduct = {...existingProduct};
            /*on that updated product we will set the quantity equal to the old quantity plus one. */
                updatedProduct.qty = updatedProduct.qty +1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 }; 
                cart.products = [...cart.products, updatedProduct];               
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            /*we can use the file system write file and write it to that path and then define what we want to put there
            and we want to write cart into the path,in a stringified version, as json and then here we have a callback where we might get an error which we want to output */
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });     
        });
    };

    static deleteProduct (id, productPrice) { //productPrice we use because we'll need to update the total cart price.
        //first  need to get my cart //to read file
        fs.readFile(p, (err, fileContent) => {
            if (err) {
               return; 
            }
            const updatedCart = {...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
               prod => prod.id !== id 
            );
            updatedCart.totalPrice = 
               updatedCart.totalPrice - productPrice * productQty;
               
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
               console.log(err);
            });   
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
          const cart = JSON.parse(fileContent);
          if (err) {
            cb(null);
          } else {
            cb(cart);
          }
        });
      }
};