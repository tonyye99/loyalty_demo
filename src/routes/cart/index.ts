import { Router } from 'express'
import { SuccessResponse } from '../../core/ApiResponse'
import asyncHandler from '../../helpers/asyncHandler'
import validator, { ValidationSource } from '../../helpers/validator'
import schema from './schema'
import ShoppingCartRepo from '../../database/repository/ShoppingCartRepo'
import { BadRequestError } from '../../core/ApiError'
import { calculateOrderTotal } from '../../core/utils'
import CustomerRepo from '../../database/repository/CustomerRepo'
import CheckoutRoute from './checkout'

const router = Router()

router.use('/checkout', CheckoutRoute)

router.post(
  '/',
  validator(schema.cartCreate),
  asyncHandler(async (req, res) => {
    const cart = await ShoppingCartRepo.create({
      customer_id: req.body.customerId,
      redeemed_points: 0,
    })

    new SuccessResponse('Success', cart).send(res)
  }),
)

router.post(
  '/:id/items',
  validator(schema.cartId, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const cartId = Number(req.params.id)
    const items = req.body.items

    if (!items || items.length === 0) {
      throw new BadRequestError('No items provided')
    }

    const shoppingCart = await ShoppingCartRepo.getShoppingCart(cartId)
    if (!shoppingCart) {
      throw new BadRequestError('Cart not found')
    }

    const updatedCart = await ShoppingCartRepo.addItemsToCart(cartId, items)

    if (!updatedCart) {
      throw new BadRequestError('Unable to add item to cart')
    }

    new SuccessResponse('Success', updatedCart[0]).send(res)
  }),
)

router.post(
  '/:id/redeem',
  validator(schema.cartId, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const cartId = Number(req.params.id)
    const isRedeem = req.body.isRedeem

    const shoppingCart = await ShoppingCartRepo.getShoppingCart(cartId)
    if (!shoppingCart) {
      throw new BadRequestError('Cart not found')
    }

    const customer = await CustomerRepo.findById(shoppingCart.customer_id)
    if (!customer) {
      throw new BadRequestError('Customer not found')
    } else if (!customer.eligible_to_redeem_points) {
      throw new BadRequestError('Customer not eligible to redeem points')
    }

    await ShoppingCartRepo.redeemPoints(
      shoppingCart.cart_id,
      isRedeem ? customer.points_balance : 0,
    )

    new SuccessResponse('Success', {}).send(res)
  }),
)

router.get(
  '/:id/total',
  validator(schema.cartId, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const cartId = Number(req.params.id)
    const shoppingCart = await ShoppingCartRepo.getShoppingCart(cartId)
    if (!shoppingCart) {
      throw new BadRequestError('Cart not found')
    }

    const items = shoppingCart.items.map((item) => {
      return {
        price: item.product.price,
        quantity: item.quantity,
      }
    })

    let orderTotal = calculateOrderTotal(items)

    if (shoppingCart.redeemed_points > 0) {
      orderTotal -= shoppingCart.redeemed_points
    }

    new SuccessResponse('Success', { orderTotal }).send(res)
  }),
)

export default router
