const conn = require('../db/conn')

const { ObjectId } = require('mongodb')

class Product {

    constructor(name, image, price, description) {
        this.name = name
        this.image = image
        this.price = price
        this.description = description
    }

    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description,
        })

        return
    }

    static async getProducts() {
        const products = await conn.db().collection('products').find().toArray()
        return products
    }

    //apenas um
    static async getProductById(id) {
        const product = await conn
            .db()
            .collection('products')
            .findOne({ _id: new ObjectId(id) })
        return product
    }

    static async removeProductById(id) {

        // const id = req.params.id
        await conn
            .db()
            .collection('products')
            .deleteOne({ _id: new ObjectId(id) })

        return
    }

}

module.exports = Product