import { Request } from 'express'
import { IApiKey } from '../database/models/Apikey.model'
import { IUser } from '../database/models/User.model'

declare interface ProtectedRequest extends Request {
  apiKey: IApiKey
  user: IUser
}

declare interface checkoutRequest extends ProtectedRequest {
  body: {
    cartId: number
  }
}
