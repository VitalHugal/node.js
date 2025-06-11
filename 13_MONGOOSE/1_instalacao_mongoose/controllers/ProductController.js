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

    static async getProduct(req, res) {
        const id = req.params.id

        try {
            const product = await Product.getProductById(id)

            if (!product) {
                return res.status(404).send('Produto não encontrado')
            }

            res.render('products/product', { product })
        } catch (error) {
            console.error('Erro ao buscar produto:', error)
            res.status(400).send('ID inválido ou erro ao buscar produto')
        }
    }

    static async removeProduct(req, res) {
        const id = req.params.id

        await Product.removeProductById(id)

        res.redirect('/products')
    }

    static async editProduct(req, res) {

        const id = req.params.id

        const product = await Product.getProductById(id)

        res.render('products/edit', { product })
    }

    static async editProductPost(req, res) {
        const id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        const product = new Product(name, image, price, description)

        await product.updateProduct(id)

        res.redirect('/products')
    }
}