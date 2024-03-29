import Joi from 'joi'

export default {
  customerCreate: Joi.object().keys({
    customer_first_name: Joi.string().required(),
    customer_last_name: Joi.string().required(),
    email: Joi.string().required(),
    points_balance: Joi.number().required(),
    eligible_to_redeem_points: Joi.boolean().required(),
  }),
  customerUpdate: Joi.object().keys({
    customer_first_name: Joi.string().required(),
    customer_last_name: Joi.string().required(),
    points_balance: Joi.number().required(),
    eligible_to_redeem_points: Joi.boolean().required(),
  }),
  customerId: Joi.object().keys({
    id: Joi.number().required(),
  }),
  transferPoints: Joi.object().keys({
    transfer_amount: Joi.number().required(),
    to_customer_id: Joi.number().required(),
  }),
}
