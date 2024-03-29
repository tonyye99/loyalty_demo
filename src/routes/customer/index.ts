import { Router } from 'express'
import asyncHandler from '../../helpers/asyncHandler'
import { SuccessResponse } from '../../core/ApiResponse'
import validator, { ValidationSource } from '../../helpers/validator'
import schema from './schema'
import CustomerRepo from '../../database/repository/CustomerRepo'
import { ICustomer } from '../../database/models/Customer.model'
import PointTransferRepo from '../../database/repository/PointTransferRepo'
import { BadRequestError } from '../../core/ApiError'

const router = Router()

router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const customers = await CustomerRepo.findAll()
    // pagination
    new SuccessResponse('Success', customers).send(res)
  }),
)

router.post(
  '/',
  validator(schema.customerCreate),
  asyncHandler(async (req, res) => {
    const createdCustomer = await CustomerRepo.create({
      ...req.body,
    } as ICustomer)

    new SuccessResponse('Success', createdCustomer).send(res)
  }),
)

router.put(
  '/:id',
  validator(schema.customerId, ValidationSource.PARAM),
  validator(schema.customerUpdate),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const updatedProduct = await CustomerRepo.update(id, req.body)
    new SuccessResponse('Success', updatedProduct).send(res)
  }),
)

router.delete(
  '/:id',
  validator(schema.customerId, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const deletedProduct = await CustomerRepo.deleteById(id)
    new SuccessResponse('Success', deletedProduct).send(res)
  }),
)

router.post(
  '/:id/transfer',
  validator(schema.customerId, ValidationSource.PARAM),
  validator(schema.transferPoints),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const transferAmount = Number(req.body.transfer_amount)
    const toCustomerId = Number(req.body.to_customer_id)

    if (id === toCustomerId) {
      throw new BadRequestError('Cannot transfer points to same customer')
    }

    const fromCustomer = await CustomerRepo.findById(id)
    if (!fromCustomer) {
      throw new BadRequestError('Customer not found')
    }
    if (fromCustomer.points_balance < transferAmount) {
      throw new BadRequestError('Insufficient points')
    }

    const pointTransfer = await PointTransferRepo.create({
      from_customer_id: id,
      to_customer_id: toCustomerId,
      point_transfer_points: transferAmount,
      transfer_date: new Date(),
    })

    await CustomerRepo.adjustPoints(id, transferAmount, 'decrement')
    await CustomerRepo.adjustPoints(toCustomerId, transferAmount, 'increment')

    new SuccessResponse('Success', {
      ...pointTransfer,
      from_customer: await CustomerRepo.findById(id),
      to_customer: await CustomerRepo.findById(toCustomerId),
    }).send(res)
  }),
)

export default router
