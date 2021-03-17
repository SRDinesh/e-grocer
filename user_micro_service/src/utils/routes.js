const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const authService = require('../services/auth');
const addressService = require('../services/address');

router.get('/',userService.getUser);

router.post('/',userService.createUser);

router.post('/login',authService.login);

router.get('/address',addressService.getAddress);

router.post('/address',addressService.postAddress);

module.exports = router;