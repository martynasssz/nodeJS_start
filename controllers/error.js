exports.get404 = ((req, res, next) => { // catch all middleware //without path filter
    res.status(404).render('404', {pageTitle: 'Page Not Found', path:null}); //instead sendFile
}) 