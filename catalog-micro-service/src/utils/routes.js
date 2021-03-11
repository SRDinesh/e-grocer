const express = require('express');
const router = express.Router();
const categoryService = require('../services/category');

router.get('/category',categoryService.getCategory);

router.post('/category',categoryService.postCategory);

router.put('/category',categoryService.updateCategory);

router.delete('/category/:id',categoryService.deleteCategory);

module.exports = router;