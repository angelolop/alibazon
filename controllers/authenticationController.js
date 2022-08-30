const config = require('../config');

exports.registerPage = function (req,res) {
    try {
        return res.render('register', {header: false, jumbotron: false})
    } catch (error) {
        res.render('error', {error: error, header: false});
    };
};

exports.registerCreate = async function (req, res, next){
        if (req.body.name &&
        req.body.email &&
        req.body.password &&
        req.body.confirmPassword) {
            //confirm that user typed same password twice
            if (req.body.password !== req.body.confirmPassword) {
                var err = new Error ('Password do not match.');
                err.status = 400;
                return next(err)
            } try {
            //use post method to insert document into api
                let register = await config.api.post('/auth/signup', {
                        secretKey: config.secretKey,
                        name: req.body.name, 
                        email: req.body.email,
                        password: req.body.password  
                    });
                    req.session.userId = register.data.token
                    res.redirect('/');
            } catch (error) {
                res.render('error', {error: error, header: false});
            }
        } else {
            let err = new Error('All files required.');
            err.status = 400;
            return next (err);
        };
}; 

exports.loginPage = function (req, res, next) {
    try {
        return res.render ('login', { header: false });
    } catch (error) {
        res.render('error', {error: error, header: false});
    };
};

exports.loginPost = async function (req, res, next) {
    if (req.body.email && req.body.password) {
        try {
            let login = await config.api.post('/auth/signin', {
                    secretKey: config.secretKey,
                    email: req.body.email,
                    password: req.body.password
                })
                req.session.userId = login.data.token;
                res.redirect('/');
        } catch (error) {
            res.render('error', {error: error, header: false});
        }
    } else {
        let err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    };
};

exports.logout = function (req, res, next) {
    try{   
        req.session.destroy (() => {
            res.redirect("/");
        })
    } catch (error) {
        res.render('error', {error: error, header: false});
    };
};

exports.profile = function (req, res, next) {
    try {
        res.render('profile', { header: false})
    } catch (error) {
        res.render('error', {error: error, header: false});
    };
};