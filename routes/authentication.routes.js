const express = require("express");
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');

router.get('/register', authenticationController.registerPage);

router.post('/register', authenticationController.registerCreate);

router.get('/login', authenticationController.loginPage);

router.post('/login', authenticationController.loginPost)

router.get('/logout', authenticationController.logout)

router.get('/profile', authenticationController.profile); 

module.exports = router;