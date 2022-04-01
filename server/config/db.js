const { createPool } = require("mysql");

const pool = createPool({
  host: "104.155.142.27",
  port: 3306,
  user: "root",
  password: "Websql123@",
  database: "WebProject",
  connectionLimit: 1000
});

module.exports = pool;