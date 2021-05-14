const path = require('path');

const express = require('express'); // import express js
const bodyParser = require('body-parser');
const session  = require('express-session');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');




const app = express(); //create an express application and store in a constant app like function

app.set('view engine', 'ejs'); //swith the view egine to hanglebars // registeres a shbs
app.set('views', 'views');

const adminRoutes = require('./routes/admin'); //import admin data
const shopRoutes = require('./routes/shop'); //import admin routes
const authRoutes = require('./routes/auth'); //import admin routes

app.use(bodyParser.urlencoded({ extended: false })); //extended:false, because it shoud be parse non-default features
app.use(express.static(path.join(__dirname, 'public'))); //user should be able access the public path
app.use(session({secret: 'my secret', resave: false, saveUninitialized:false}));//register a middleware (initialize)

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
app.use(authRoutes);

app.use(errorController.get404); //get from error controller

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem} ); // through keep telling sequelize where these connection should be stored and that is out cart item model
Product.belongsToMany(Cart, { through: CartItem});
User.hasMany(Order); // order belongs to a user and it doesn't belong to many users because a single order is always belonging to one user who placed the order and the user may have many order //it's a one to many relationship
Order.belongsToMany(Product, {through: OrderItem})  // Now an order however can belong to many products


//Relate models 
sequelize
  //.sync({ force: true })
  .sync()
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
    return user.createCart();    
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


