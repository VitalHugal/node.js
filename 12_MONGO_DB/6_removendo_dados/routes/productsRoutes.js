const express = require('express')

const router = express.Router()

const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.showProducts)
router.get('/create', ProductController.createProduct)
router.get('/:id', ProductController.getProduct)
router.post('/remove/:id', ProductController.removeProduct)
router.post('/create', ProductController.createProductPost)

module.exports = router