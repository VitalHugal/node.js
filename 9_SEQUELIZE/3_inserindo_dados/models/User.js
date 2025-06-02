const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    }
});

module.exports = User;


