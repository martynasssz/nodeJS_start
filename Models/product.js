// const products =[]; product will be saved in a file
const fs = require('fs'); //use files system
const path = require('path'); //use path module to construct a path that works om all operating systems

module.exports = class Product {
    constructor(t) {
        this.title = t; //t means a title //property of this class
    }

    save() { // save method available in this class
      // products.push(this); //this refers to the object created on the class and that is the object I want to store in this array
      const p = path.join(
        path.dirname(process.mainModule.filename), //root directory, in there we will have new data folder, in data folder store file products.json
       'data', 
       'products.json'
      ); 
      //to store new product need in there need to get the existeing array of products
      fs.readFile(p, (err, fileContent) => { // when we done reading we get err or fileContent
          let products = [];
          if (!err) {
            products = JSON.parse(fileContent); //parse method  takes incoming json and gives us back a javascript array or  object or whatever is in the file
          } 
          // append our new product there, we will call products push and push my new product which is this, onto it.
          products.push(this);
          //save it back to a file // we will write it to the same path as where we read it from and we will put our json data into it,
          fs.writeFile (p, JSON.stringify(products), (err) => {
              console.log(err);
          }); //  stringify find method which takes a javascript object or array and converts it into json (take products array)
      }); 
    }  

    //retreive product from this array
    // static means that I can call this method directly on the class itself and not on an instantiated object
    static fetchAll(cb) { //fetchAll() utility function //cb - argument which holds a fumnction (callback)
        const p = path.join(
            path.dirname(process.mainModule.filename), //root directory, in there we will have new data folder, in data folder store file products.json
            'data', 
            'products.json'
        );         
        fs.readFile(p, (err, fileContent) => {
                if(err) {
                    cb([]) ; //if err return empty array because we have no products //cb callack what we pass empty array
                }
                cb(JSON.parse(fileContent)); //pass in callback cb parsed json data
            } )       
    }
};