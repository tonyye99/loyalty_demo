import express from 'express'
import ApiKeyRepo from '../database/repository/ApiKeyRepo'
import { ForbiddenError } from '../core/ApiError'
import { ProtectedRequest } from 'app-request'
import validator, { ValidationSource } from '../helpers/validator'
import asyncHandler from '../helpers/asyncHandler'
import schema from './schema'
import UserRepo from '../database/repository/UserRepo'

const router = express.Router()

enum Header {
  API_KEY = 'x-api-key',
  AUTHORIZATION = 'authorization',
}

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    const key = req.headers[Header.API_KEY]?.toString()
    if (!key) throw new ForbiddenError()

    const apiKey = await ApiKeyRepo.findByKey(key)
    if (!apiKey) throw new ForbiddenError()

    const user = await UserRepo.findByApiKeyId(apiKey.apiKey_id)
    if (!user) throw new ForbiddenError()

    req.apiKey = apiKey
    req.user = user
    return next()
  }),
)
