const path = require('path');

const express = require('express'); // import express js
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express(); //create an express application and store in a constant app like function

app.set('view engine', 'ejs'); //swith the view egine to hanglebars // registeres a shbs
app.set('views', 'views');

const adminRoutes = require('./routes/admin'); //import admin data
const shopRoutes = require('./routes/shop'); //import admin routes

app.use(bodyParser.urlencoded({ extended: false })); //extended:false, because it shoud be parse non-default features
app.use(express.static(path.join(__dirname, 'public'))); //user should be able access the public path

app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

//outsources routes
app.use('/admin', adminRoutes); //adminRoutes because changed export
app.use(shopRoutes);

app.use(errorController.get404); //get from error controller

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem} ); // through keep telling sequelize where these connection should be stored and that is out cart item model
Product.belongsToMany(Cart, { through: CartItem});

//Relate models 
sequelize
  .sync({ force: true })
  //.sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


