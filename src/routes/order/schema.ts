import Joi from 'joi'

export default {
  checkout: Joi.object().keys({
    cartId: Joi.number().required(),
  }),
  orderId: Joi.object().keys({
    id: Joi.number().required(),
  }),
}
