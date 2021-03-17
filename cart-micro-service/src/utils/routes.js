const express = require('express');
const router = express.Router();
const cartService = require('../services/cart');

router.post('/',cartService.addCart);

router.get('/',cartService.listCart);

router.put('/',cartService.removeQty);

router.delete('/',cartService.deleteItem);

module.exports = router;