import Joi from 'joi'

export default {
  cartCreate: Joi.object()
    .keys({
      customerId: Joi.number().required(),
    })
    .unknown(true),
  cartId: Joi.object().keys({
    id: Joi.number().required(),
  }),
}
