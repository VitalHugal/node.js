const mongoose = require('mongoose')

async function main() {
    await mongoose.connect("mongodb://loalhost27017/getapet")
    console.log('Conectou ao Mongoose!')
}

main().catch((err) => console.log(err))

module.exports = mongoose