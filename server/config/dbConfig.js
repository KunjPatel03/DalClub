// @Author: Kishan Thakkar
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: require('find-config')('.env') })
const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env
// console.log(DB_HOST)
const DBConnection = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 3306,
  dialect: 'mysql',
});

module.exports = DBConnection