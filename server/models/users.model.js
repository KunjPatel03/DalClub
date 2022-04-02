const pool = require("../config/db");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(user_name, user_email, user_password) 
                values(?,?,?)`,
      [
        data.user_name,
        data.user_email,
        data.user_password
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where user_email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};