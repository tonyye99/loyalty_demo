import { Router } from 'express'
import asyncHandler from '../../helpers/asyncHandler'
import { SuccessResponse } from '../../core/ApiResponse'
import validator, { ValidationSource } from '../../helpers/validator'
import schema from './schema'
import { ProtectedRequest } from 'app-request'
import SettingRepo from '../../database/repository/SettingRepo'
import { ISetting } from '../../database/models/Setting.model'

const router = Router()

router.put(
  '/:id',
  validator(schema.settingId, ValidationSource.PARAM),
  validator(schema.settingUpdate),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const id = Number(req.params.id)
    const updatedSetting = await SettingRepo.update(id, {
      ...req.body,
      modified_by: req.user.user_id,
    })
    new SuccessResponse('Success', updatedSetting).send(res)
  }),
)

router.get(
  '/:name/detail',
  validator(schema.settingName, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const name = req.params.name
    const setting = await SettingRepo.findByName(name)
    new SuccessResponse('Success', { setting }).send(res)
  }),
)

router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const setting = await SettingRepo.findAll()
    new SuccessResponse('Success', { setting }).send(res)
  }),
)

router.delete(
  '/:id',
  validator(schema.settingId, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const id = Number(req.params.id)
    const deletedSetting = await SettingRepo.deleteById(
      id,
      Number(req.user.user_id),
    )
    new SuccessResponse('Success', deletedSetting).send(res)
  }),
)

router.post(
  '/',
  validator(schema.settingCreate),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const createdSetting = await SettingRepo.create({
      ...req.body,
      created_by: req.user.user_id,
      modified_by: req.user.user_id,
    } as ISetting)

    new SuccessResponse('Success', createdSetting).send(res)
  }),
)

export default router
