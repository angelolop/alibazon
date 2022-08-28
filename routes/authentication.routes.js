const express = require("express");
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const mid = require('../middlewares');

router.get('/register', mid.loggedOut, authenticationController.registerPage);

router.post('/register', authenticationController.registerCreate);

router.get('/login', mid.loggedOut, authenticationController.loginPage);

router.post('/login', authenticationController.loginPost);

router.get('/logout', mid.requiresLogin ,authenticationController.logout);

router.get('/profile', mid.requiresLogin, authenticationController.profile); 

module.exports = router;