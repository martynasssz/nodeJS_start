const path = require('path');

const express = require('express');

const router = express.Router(); //create router object 

router.get('/', (req, res, next) => { //use() method defined be expressjs, it's allows to add new middleware function    
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //sendfile() allows to send back a file to the user //automatically sets content type responce header field
}); 

module.exports = router;