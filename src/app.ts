import express, { Request, Response, NextFunction } from 'express'
import {
  NotFoundError,
  ApiError,
  InternalError,
  ErrorType,
} from './core/ApiError'
import Logger from './core/Logger'
import { corsUrl, environment } from './config'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }))

app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    if (req.originalUrl === '/order/webhook/success') {
      next()
    } else {
      express.json()(req, res, next)
    }
  },
)
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
)

// Routes
app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()))

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res)
    if (err.type === ErrorType.INTERNAL)
      Logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      )
  } else {
    Logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    )
    Logger.error(err)
    if (environment === 'development') {
      return res.status(500).send(err)
    }
    ApiError.handle(new InternalError(), res)
  }
})

export default app
