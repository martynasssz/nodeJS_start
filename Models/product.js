const products =[];

module.exports = class Product {
    constructor(t) {
        this.title = t; //t means a title //property of this class
    }

    save() { // save method available in this class
       products.push(this); //this refers to the object created on the class and that is the object I want to store in this array
    }  

    //retreive product from this array
    // static means that I can call this method directly on the class itself and not on an instantiated object
    static fetchAll() { //fetchAll() utility function 
        return products;
    }

}