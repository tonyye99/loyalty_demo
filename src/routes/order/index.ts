import { Router } from 'express'
import asyncHandler from '../../helpers/asyncHandler'
import { SuccessResponse } from '../../core/ApiResponse'
import validator, { ValidationSource } from '../../helpers/validator'
import schema from './schema'
import OrderRepo from '../../database/repository/OrderRepo'

const router = Router()

router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const orders = await OrderRepo.findAll()
    // pagination
    new SuccessResponse('Success', orders).send(res)
  }),
)

router.delete(
  '/:id',
  validator(schema.orderId, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const deletedOrder = await OrderRepo.deleteById(id)
    new SuccessResponse('Success', deletedOrder).send(res)
  }),
)

export default router
