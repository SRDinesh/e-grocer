const express = require('express');
const router = express.Router();
const orderService = require('../services/order');

router.post('/',orderService.orderCartItem);

module.exports = router;