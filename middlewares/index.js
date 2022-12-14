exports.loggedOut = function (req, res, next) {
    if (req.session.userId) {
        return res.redirect('/profile');
    };
    return next();
};

exports.requiresLogin = function (req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        let err = new Error('You must be logged in to view this page.');
        res.render('error', {err, header: false});
    };
};