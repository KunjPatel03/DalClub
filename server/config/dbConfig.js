// @Author: Kishan Thakkar
const { Sequelize } = require("sequelize");
const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const DBConnection = new Sequelize("WebProject", "root", "Websql123@", {
  host: "104.155.142.27",
  port: 3306,
  dialect: "mysql",
});

module.exports = DBConnection;
