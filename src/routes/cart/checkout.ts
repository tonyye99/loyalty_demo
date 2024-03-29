import { Router } from 'express'
import { checkoutRequest } from 'app-request'
import { SuccessResponse } from '../../core/ApiResponse'
import { BadRequestError } from '../../core/ApiError'
import { stripe } from '../../core/Stripe'
import { clientUrl } from '../../config'
import asyncHandler from '../../helpers/asyncHandler'
import validator from '../../helpers/validator'
import schema from '../order/schema'
import ShoppingCartRepo from '../../database/repository/ShoppingCartRepo'

const router = Router()

router.post(
  '/',
  validator(schema.checkout),
  asyncHandler(async (req: checkoutRequest, res) => {
    const shoppingCart = await ShoppingCartRepo.getShoppingCart(req.body.cartId)

    if (!shoppingCart) throw new BadRequestError('Cart not found')

    let coupon = undefined
    if (shoppingCart.redeemed_points > 0) {
      coupon = await stripe.coupons.create({
        // https://docs.stripe.com/currencies#zero-decimal
        amount_off: shoppingCart.redeemed_points * 100,
        currency: 'usd',
        duration: 'once',
      })
    }

    const line_items = shoppingCart.items.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.product_name,
          },
          // https://docs.stripe.com/currencies#zero-decimal
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      }
    })

    const customer = await stripe.customers.create({
      metadata: {
        userId: shoppingCart.customer_id.toString(),
        cartId: shoppingCart.cart_id.toString(),
      },
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer: customer.id,
      discounts: coupon ? [{ coupon: coupon.id }] : [],
      success_url: `${clientUrl}/success`,
      cancel_url: `${clientUrl}/cancel`,
    })

    new SuccessResponse('Success', {
      session_url: session.url,
    }).send(res)
  }),
)

export default router
