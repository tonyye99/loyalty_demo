require('ts-node/register')
const { db } = require('../../config.ts')
console.log(db)
module.exports = {
  development: {
    username: db.user,
    password: db.password,
    database: db.name,
    host: db.host,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: db.user,
    password: db.password,
    database: db.name,
    host: db.host,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: db.user,
    password: db.password,
    database: db.name,
    host: db.host,
    port: db.port,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
}
