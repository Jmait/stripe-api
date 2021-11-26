const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: "123456",
    database: "my_db",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false
  },
  test: {
    url: 'postgres://rtkksliv:7mL8Wl-BQDIoWxVmuPmbX7IL9QAKX2nA@lallah.db.elephantsql.com:5432/rtkksliv',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    }
  },
  production: {
    username: process.env.DB_UNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port:process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    }
  }
};