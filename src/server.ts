import Logger from './core/Logger'
import { port } from './config'
import db from './database'
import app from './app'

db.sequelize
  .sync({ force: false })
  .catch((err: any) => {
    Logger.error(`DB connection error: ${err}`)
    process.exit(1)
  })
  .finally(() => {
    app
      .listen(port, () => {
        Logger.info(`server running on port : ${port}`)
      })
      .on('error', (e) => Logger.error(e))
  })
