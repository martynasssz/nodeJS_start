
const fs = require('fs'); //use files system
const path = require('path'); //use path module to construct a path that works om all operating systems

//global helper
const p = path.join(
    path.dirname(process.mainModule.filename), //root directory, in there we will have new data folder, in data folder store file products.json
    'data', 
    'products.json'
);  

const getProductsFromFile = cb => { //helper function         
    fs.readFile(p, (err, fileContent) => {
        if(err) {
          cb([]) ; //if err return empty array because we have no products //cb callack what we pass empty array
        } else {
          cb(JSON.parse(fileContent)); //pass in callback cb parsed json data
        } 
    }); 
} 
module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title; 
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() { // save method available in this class     
        getProductsFromFile(products => {
          if (this.id) { //check if this id is already existing
        /*Now in this if statement, I we want to update the existing product and for that, we need to find it first.
        So we'll find existingRroductIndex by searching for or going through all our products with the findIndex method,
        products will be an array and there,we will get access to all our products stored in the temporary
        prod argument here or in the prod argument of this anonymous function and we check
        if the ID of the product we're looking at in this array is equal to this ID, we now looking at the product I plan on editing.*/
            const existingProductIndex = products.findIndex(
                prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile (p, JSON.stringify(updatedProducts), err => {
                console.log(err);
            });   
          } else {
            this.id = Math.random().toString(); // toString() - text unique id
            products.push(this);         
            fs.writeFile (p, JSON.stringify(products), err => {
              console.log(err);
            });   
          }             
        });    
    }  

    //retreive product from this array
    // static means that I can call this method directly on the class itself and not on an instantiated object
    static fetchAll(cb) { //fetchAll() utility function //cb - argument which holds a fumnction (callback)
        getProductsFromFile(cb);          
    }

    //load single method
    //static function into which we pass ID (expected to get) and callback (cb) which will be executed once we're done finding the product here.
    static findById(id, cb) {
       getProductsFromFile(products => {
          const product = products.find(p => p.id === id);  //find my product and store in const variable temporaly // this will execute a function we pass to find on every element in the array and we'll return the element for which this function we pass returns true.
          cb(product);
       }); 
    }
};