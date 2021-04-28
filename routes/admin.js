const express = require('express');

const router = express.Router(); //Router() is like mini express app tied to the other express router

router.get('/add-product', (req, res, next) => {     
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');     
}); 

//middleware thats handles requests to product
// if we use post, this middlewave will be trigger for incoming post request with this path

router.post('/product', (req, res, next) => { 
    //redirect and log to console
    console.log(req.body); //req.body a new fied added by express //extracting what user has send
    res.redirect('/'); //redirect to slash route after submit pressing
});

module.exports = router; //router has two router registered
