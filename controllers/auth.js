exports.getLogin = (req, res, next) => {
    const isLoggedIn = req
      .get('Cookie')
      //.split('=')[1];
      console.log(req.session.isLoggedIn);
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    //res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly'); // for saving loggedin
    req.session.isLoggedIn = true;
    res.redirect('/');
};