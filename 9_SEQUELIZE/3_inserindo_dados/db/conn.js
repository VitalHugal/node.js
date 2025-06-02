const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3308,
});

try {
  sequelize.authenticate()
  console.log('db connected')
} catch (error) {
  console.log("Não foi possível connectar ao DB:", error)
}

module.exports = sequelize