const express = require("express");
const router = express.Router();
const mid = require('../middleware');
const authenticationController = require('../controllers/authencationController');

router.get('/register', authenticationController.registerPage);

router.post('/register', authenticationController.registerCreate);

router.get('/login', authenticationController.loginPage);

router.post('/login', authenticationController.loginPost)

router.get('/logout', authenticationController.logout)

router.get('/profile', mid.requiresLogin, authenticationController.profile); 

module.exports = router;