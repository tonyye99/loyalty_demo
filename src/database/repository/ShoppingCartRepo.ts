import ProductModel from '../models/Product.model'
import ShoppingCartModel, { IShoppingCart } from '../models/ShoppingCart.model'
import ShoppingCartItemsModel from '../models/ShoppingCartItems.model'

async function create(
  cart: Omit<IShoppingCart, 'cart_id' | 'items'>,
): Promise<IShoppingCart> {
  const createdCart = await ShoppingCartModel.create({
    ...cart,
  })
  return createdCart.toJSON()
}

async function getShoppingCart(cart_id: number): Promise<IShoppingCart | null> {
  const cart = await ShoppingCartModel.findOne({
    where: { cart_id },
    include: [
      {
        model: ShoppingCartItemsModel,
        as: 'items',
        include: [
          {
            model: ProductModel,
            as: 'product',
          },
        ],
      },
    ],
  })
  return cart ? cart.toJSON() : null
}

async function addItemsToCart(
  cart_id: number,
  items: { product_id: number; quantity: number }[],
) {
  const existingItems = await ShoppingCartItemsModel.findAll({
    where: {
      cart_id,
      product_id: items.map((item) => item.product_id),
    },
  })

  if (existingItems.length > 0) {
    const existingItemIds = existingItems.map((item) => item.product_id)
    const newItems = items.filter(
      (item) => !existingItemIds.includes(item.product_id),
    )
    if (newItems.length > 0) {
      const createdItems = await ShoppingCartItemsModel.bulkCreate(
        newItems.map((item) => ({
          ...item,
          cart_id,
        })),
      )
      return createdItems
    }

    return existingItems
  }

  const createdItems = await ShoppingCartItemsModel.bulkCreate(
    items.map((item) => ({
      ...item,
      cart_id,
    })),
  )
  return createdItems
}

async function redeemPoints(cart_id: number, points: number) {
  const updatedCart = await ShoppingCartModel.update(
    {
      redeemed_points: points,
    },
    {
      where: { cart_id },
    },
  )
  return updatedCart[0]
}

export default { create, getShoppingCart, addItemsToCart, redeemPoints }
