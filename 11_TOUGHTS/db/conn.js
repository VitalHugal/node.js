const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('projeto_toughts_node', 'root', 'root', {
    host: 'localhost',
    port: '3308',
    dialect: 'mysql'
});



try {
    sequelize.authenticate()
    console.log('connected db')
} catch (error) {
    console.log(`error db: ${error}`)
}

module.exports = sequelize