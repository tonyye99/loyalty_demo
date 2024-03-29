import UserModel, { IUser } from '../models/User.model'

async function findByApiKeyId(id: number): Promise<IUser | null> {
  const user = await UserModel.findOne({ where: { api_key_id: id } })
  return user ? user.toJSON() : null
}

export default {
  findByApiKeyId,
}
