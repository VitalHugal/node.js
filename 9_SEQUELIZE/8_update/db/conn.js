const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sequelize', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3308
})

// try {
//   sequelize.authenticate()
//   console.log('Conectamos com o Sequelize!')
// } catch (error) {
//   console.error('Não foi possível conectar:', error)
// }

module.exports = sequelize
