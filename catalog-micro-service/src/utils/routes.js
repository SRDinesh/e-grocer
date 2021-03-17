const express = require('express');
const router = express.Router();
const categoryService = require('../services/category');
const productService = require('../services/product');

router.get('/category',categoryService.getCategory);

router.post('/category',categoryService.postCategory);

router.put('/category',categoryService.updateCategory);

router.delete('/category/:id',categoryService.deleteCategory);

router.post('/product',productService.postProduct);

router.get('/product',productService.getProduct);

module.exports = router;