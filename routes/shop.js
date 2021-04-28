const express = require('express');

const router = express.Router(); //create router object 

router.get('/', (req, res, next) => { //use() method defined be expressjs, it's allows to add new middleware function    
    res.send('<h1>Hello from Express</h1>'); // send allow to send a response
}); 

module.exports = router;