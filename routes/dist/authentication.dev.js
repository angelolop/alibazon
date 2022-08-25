"use strict";

var express = require("express");

var router = express.Router();
var secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX.";
var api = "https://backend-academy-osf.herokuapp.com/api/";

var axios = require("axios");

var mid = require('../middleware');

router.get('/register', function (req, res, next) {
  return res.render('register', {
    header: false,
    jumbotron: false
  });
});
router.post('/register', function _callee(req, res, next) {
  var err;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.body.email && req.body.name && req.body.password && req.body.confirmPassword)) {
            _context.next = 9;
            break;
          }

          if (!(req.body.password !== req.body.confirmPassword)) {
            _context.next = 5;
            break;
          }

          err = new Error('Password do not match.');
          err.status = 400;
          return _context.abrupt("return", next(err));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(axios.post(api + '/auth/signup', {
            secretKey: secretKey,
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
          }).then(function () {
            res.redirect("/");
          })["catch"](function (err) {
            console.error(err);
          }));

        case 7:
          _context.next = 12;
          break;

        case 9:
          err = new Error('All files required.');
          err.status = 400;
          return _context.abrupt("return", next(err));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}); // GET /login

router.get('/login', function (req, res, next) {
  return res.render('login', {
    header: false
  });
}); // POST /login

router.post('/login', function _callee2(req, res, next) {
  var err;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.body.email && req.body.password)) {
            _context2.next = 5;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(axios.post(api + '/auth/signin', {
            secretKey: secretKey,
            email: req.body.email,
            password: req.body.password
          }).then(function () {
            req.session.userId = req.sessionID;
            res.redirect('/');
          })["catch"](function (err) {
            console.error(err);
          }));

        case 3:
          _context2.next = 8;
          break;

        case 5:
          err = new Error('Email and password are required.');
          err.status = 401;
          return _context2.abrupt("return", next(err));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // GET /logout 

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
}); // GET /profile

router.get('/profile', mid.requiresLogin, function (req, res, next) {
  if (error) {
    return next(error);
  } else {
    res.render('profile', {
      header: false
    });
  }
});
module.exports = router;