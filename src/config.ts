require('dotenv').config()

export const environment = process.env.NODE_ENV
export const port = process.env.PORT

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PWD || '',
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
}

export const corsUrl = process.env.CORS_URL

export const logDirectory = process.env.LOG_DIR

export const stripeConfig = {
  secret: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}

export const clientUrl = process.env.CLIENT_URL
