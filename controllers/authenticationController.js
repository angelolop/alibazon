const api = "https://backend-academy-osf.herokuapp.com/api/";
const secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX.";
const axios = require("axios");

exports.registerPage = function (req,res) {
    return res.render('register', {header: false, jumbotron: false});
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
            }
            //use post method to insert document into api
            await axios.post(api + '/auth/signup', {
                secretKey: secretKey,
                name: req.body.name, 
                email: req.body.email,
                password: req.body.password  
                })
                .then(() => {
                    console.log
                    res.redirect("/");
                }).catch((err) => {
                    console.error(err);
                });
        } else {
            var err = new Error('All files required.');
            err.status = 400;
            return next (err);
        }
}

exports.loginPage = function (req, res, next) {
    return res.render ('login', { header: false});
}

exports.loginPost = async function (req, res, next) {
    if (req.body.email && req.body.password) {
        await axios.post(api + '/auth/signin', {
            secretKey: secretKey,
            email: req.body.email,
            password: req.body.password
            })
            .then(() => {
                req.session.userId = req.sessionID;
                res.redirect('/');
            });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err)
    }
}

exports.logout = function(req, res, next) {
    if (req.session) {
        req.session.destroy (() => {
             res.redirect("/");
        })
    }
}

exports.profile = function(req, res, next) {
    if (req.session && req.session.userId) {
        res.render('profile', { header: false})
    } else {
        let err = new Error ("You must be logged in to view this page.");
        err.status = 401;
        return next (err);
    }
}