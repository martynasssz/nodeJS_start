const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
//access the products array
const adminData = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
  //console.log('shop.js', adminData.products);
  //res.sendFile(path.join(rootDir, 'views', 'shop.html')); //in this response we a sending shop.html file
  res.render('shop'); // we don't need show.pub because we deffined in app template engine

  //define what sould be our reponse
});

module.exports = router;
