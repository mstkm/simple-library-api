const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Book = db.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    published_date: {
        type: DataTypes.DATE,
    },
    image: {
        type: DataTypes.STRING,
    },
});

module.exports = Book;