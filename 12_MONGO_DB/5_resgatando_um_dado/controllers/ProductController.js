const Product = require('../models/Product')

module.exports = class ProductController {

    static async showProducts(req, res) {
        try {
            const products = await Product.getProducts()
            console.log(products) 
            res.render('products/all', { products })
        } catch (error) {
            console.error(error)
            res.status(500).send('Erro ao buscar produtos')
        }
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {
        try {
            const name = req.body.name
            const image = req.body.image
            const price = req.body.price
            const description = req.body.description

            const product = new Product(name, image, price, description)

            product.save()

            res.redirect('/products')
        } catch (error) {

        }
    }

    static async getProduct(req, res){
        const id = req.params.id

        const product = await Product.getProductById()

        res.render('products/product', {product})
    }
}