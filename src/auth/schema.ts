import Joi from 'joi'

enum Header {
  API_KEY = 'x-api-key',
  AUTHORIZATION = 'authorization',
}

export default {
  apiKey: Joi.object()
    .keys({
      [Header.API_KEY]: Joi.string().required(),
    })
    .unknown(true),
}
