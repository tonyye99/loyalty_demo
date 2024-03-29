import { Router } from 'express'
import asyncHandler from '../../helpers/asyncHandler'
import { SuccessResponse } from '../../core/ApiResponse'
import ProductRepo from '../../database/repository/ProductRepo'
import { IProduct } from '../../database/models/Product.model'
import validator, { ValidationSource } from '../../helpers/validator'
import schema from './schema'
import { ProtectedRequest } from 'app-request'

const router = Router()

router.get(
  '/all',
  asyncHandler(async (req, res) => {
    const products = await ProductRepo.findAll()
    // pagination
    new SuccessResponse('Success', products).send(res)
  }),
)

router.post(
  '/',
  validator(schema.productCreate),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const createdProduct = await ProductRepo.create({
      ...req.body,
      created_by: req.user.user_id,
      modified_by: req.user.user_id,
    } as IProduct)

    new SuccessResponse('Success', createdProduct).send(res)
  }),
)

router.put(
  '/:id',
  validator(schema.productId, ValidationSource.PARAM),
  validator(schema.productUpdate),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const id = Number(req.params.id)
    const updatedProduct = await ProductRepo.update(id, {
      ...req.body,
      modified_by: req.user.user_id,
    })
    new SuccessResponse('Success', updatedProduct).send(res)
  }),
)

router.delete(
  '/:id',
  validator(schema.productId, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const id = Number(req.params.id)
    const deletedProduct = await ProductRepo.deleteById(
      id,
      Number(req.user.user_id),
    )
    new SuccessResponse('Success', deletedProduct).send(res)
  }),
)

export default router
