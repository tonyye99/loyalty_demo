import Joi from 'joi'

export default {
  settingCreate: Joi.object().keys({
    name: Joi.string().required(),
    value: Joi.string().required(),
  }),
  settingUpdate: Joi.object().keys({
    name: Joi.string().required(),
    value: Joi.string().required(),
  }),
  settingName: Joi.object().keys({
    name: Joi.string().required(),
  }),
  settingId: Joi.object().keys({
    id: Joi.number().required(),
  }),
}
