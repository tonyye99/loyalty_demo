import Stripe from 'stripe'
import { stripe, webhookSecret } from '../../core/Stripe'
import { Router, raw } from 'express'
import SettingRepo from '../../database/repository/SettingRepo'
import { calculatePoints } from '../../core/utils'
import OrderRepo from '../../database/repository/OrderRepo'
import CustomerRepo from '../../database/repository/CustomerRepo'
import Logger from '../../core/Logger'
import ShoppingCartRepo from '../../database/repository/ShoppingCartRepo'
import ProductRepo from '../../database/repository/ProductRepo'

const router = Router()

router.post('/success', raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  if (!sig) {
    Logger.error('Webhook signature not found')
    return res.send().end()
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err) {
    Logger.error('Webhook signature verification failed: ' + err)
    return res.send().end()
  }

  if (event.type === 'checkout.session.completed') {
    const stripeObject = event.data.object
    try {
      const customer: any = await stripe.customers.retrieve(
        stripeObject.customer as string,
      )

      const customerToUpdate = await CustomerRepo.findById(
        Number(customer.metadata.userId),
      )
      if (!customerToUpdate) {
        Logger.error('Customer not found')
        return res.send().end()
      }

      const shoppingCart = await ShoppingCartRepo.getShoppingCart(
        customer.metadata.cartId,
      )
      if (!shoppingCart) {
        Logger.error('Cart not found')
        return res.send().end()
      }

      shoppingCart.items.forEach(async (item) => {
        await ProductRepo.adjustStock(
          item.product_id,
          item.quantity,
          'decrement',
        )
      })

      const point = await SettingRepo.findByName('points')
      const perPoint = Number(point?.value)

      let totalPointsBalance = 0
      if (perPoint > 0 && customerToUpdate.eligible_to_redeem_points) {
        // https://docs.stripe.com/currencies#zero-decimal
        const spentAmount = stripeObject.amount_total! / 100
        const rewardPoints = await calculatePoints(spentAmount, perPoint)
        Logger.info(`Reward points awarded: ${rewardPoints}`)
        totalPointsBalance =
          rewardPoints -
          Number(shoppingCart.redeemed_points) +
          Number(customerToUpdate.points_balance)
      }

      await OrderRepo.create({
        merchant: 'stripe',
        payment_intent_id: String(stripeObject.payment_intent),
        customer_id: Number(customer.metadata.userId),
        cart_id: Number(customer.metadata.cartId),
        subtotal: stripeObject.amount_subtotal! / 100,
        total: stripeObject.amount_total! / 100,
        order_date: new Date(),
        points_awarded: customerToUpdate.eligible_to_redeem_points
          ? totalPointsBalance
          : 0,
      })

      await CustomerRepo.update(customerToUpdate.customer_id, {
        ...customerToUpdate!,
        points_balance: customerToUpdate.eligible_to_redeem_points
          ? totalPointsBalance
          : customerToUpdate.points_balance,
      })
    } catch (error) {
      Logger.error('Webhook error: ' + error)
      return res.send().end()
    }
  }

  return res.send().end()
})

export default router
