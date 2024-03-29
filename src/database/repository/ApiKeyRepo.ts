import ApiKeyModel, { IApiKey } from '../models/Apikey.model'

async function findByKey(key: string): Promise<IApiKey | undefined> {
  const apikey = await ApiKeyModel.findOne({ where: { key } })
  return apikey?.toJSON()
}

export default { findByKey }
