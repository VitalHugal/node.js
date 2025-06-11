const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/testemongoose2')
    console.log('conectou ao MongoDB com mongoose!')
}

main().catch((error) => console.log(error))

module.exports = mongoose