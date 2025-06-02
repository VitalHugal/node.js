const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('sequelize_mvc', 'root', 'root', {
    host: 'localhost',
    port: 3308,
    dialect: 'mysql',
})


try {
    sequelize.authenticate()
    console.log('Conectado ao db')
} catch (error) {
    console.log(`Não foi possível conectar: ${error}`)
}

exports.default = sequelize