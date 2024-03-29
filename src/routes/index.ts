import { Router } from 'express'
import { Permission } from '../database/models/Apikey.model'
import { SuccessResponse } from '../core/ApiResponse'
import asyncHandler from '../helpers/asyncHandler'
import apikey from '../auth/apiKey'
import permission from '../helpers/permission'

import ProductRoute from './product'
import CartRoute from './cart'
import WebhookRoute from './order/webhook'
import CustomerRoute from './customer'
import SettingRoute from './setting'
import OrderRoute from './order'

const router = Router()

router.use('/order/webhook', WebhookRoute)

/*---------------------------------------------------------*/
router.use(apikey)
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use(permission(Permission.GENERAL))
/*---------------------------------------------------------*/

router.use('/product', ProductRoute)
router.use('/order', OrderRoute)
router.use('/cart', CartRoute)
router.use('/customer', CustomerRoute)
router.use('/setting', SettingRoute)

router.get(
  '/',
  asyncHandler(async (req, res) => {
    return new SuccessResponse('success', { message: 'Hello, World' }).send(res)
  }),
)

export default router
