import { Sequelize } from 'sequelize-typescript'
import { db } from '../config'
const database = {} as any

const sequelize = new Sequelize({
  database: db.name,
  username: db.user,
  password: db.password,
  host: db.host,
  dialect: 'mysql',
  pool: {
    min: 0,
    max: 5,
  },
  benchmark: true,
  models: [__dirname + '/models/*.model.js'],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
    )
  },
})

database.sequelize = sequelize
database.Sequelize = Sequelize

export default database
