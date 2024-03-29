import Joi from 'joi'

export default {
  productCreate: Joi.object().keys({
    product_name: Joi.string().required(),
    price: Joi.number().required(),
    point_cost: Joi.number(),
    stock_quantity: Joi.number().required(),
    description: Joi.string(),
  }),
  productUpdate: Joi.object().keys({
    product_name: Joi.string(),
    price: Joi.number(),
    point_cost: Joi.number(),
    stock_quantity: Joi.number(),
    description: Joi.string(),
  }),
  productId: Joi.object().keys({
    id: Joi.number().required(),
  }),
}
