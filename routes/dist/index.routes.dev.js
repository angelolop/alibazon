"use strict";

var express = require("express");

var router = express.Router();
var secretKey = "$2a$08$p3my8MGizWp3L8f6sn0PCO2c4mLv.mewFcpcfy8pGxHFi0iT4cUX.";
var api = "https://backend-academy-osf.herokuapp.com/api/";

var axios = require("axios");

router.get("/", function (req, res) {
  res.redirect("/category/womens");
});
router.get("/category/:id", function _callee(req, res) {
  var reqId, query, jumbotronDescription;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          reqId = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get(api + 'categories/parent/' + reqId, {
            // Put men or women depending on the request
            params: {
              secretKey: secretKey
            }
          }));

        case 3:
          query = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.get(api + 'categories/' + reqId, {
            // breadcrumbs
            params: {
              secretKey: secretKey
            }
          }));

        case 6:
          jumbotronDescription = _context.sent;

          if (reqId.length > 18 || reqId === "womens-outfits") {
            res.redirect("/products/" + reqId);
          }

          ;
          res.render("categories", {
            cardsOfCategories: query.data,
            jumbotron: true,
            jumbotronDescription: jumbotronDescription.data
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/products/:id", function _callee2(req, res) {
  var query;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios.get(api + 'products/product_search?page=1&primary_category_id=' + req.params.id, {
            params: {
              secretKey: secretKey
            }
          }));

        case 2:
          query = _context2.sent;
          res.render("products", {
            cardsOfProducts: query.data,
            cardsOfCategories: false,
            jumbotron: false
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get("/product/:id", function _callee3(req, res) {
  var query;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(axios.get(api + "products/product_search?id=" + req.params.id, {
            params: {
              secretKey: secretKey
            }
          }));

        case 2:
          query = _context3.sent;
          res.render("singleProduct", {
            product: query.data,
            jumbotron: false
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;