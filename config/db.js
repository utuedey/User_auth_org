// Setup sequelize and connect to the database.
require('dotenv').config()

const { Sequelize } = require('sequelize');
// const config = require('./config');

// const env = process.env.NODE_ENV || 'development';
const db_url = process.env.DATABASE_URL
const db_dialect = process.env.DIALECT

// const dbConfig = config[env];

const sequelize = new Sequelize(db_url, {
   // dialect: dbConfig.dialect,
   dialect: db_dialect,
});

module.exports = sequelize;