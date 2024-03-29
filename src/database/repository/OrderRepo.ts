import OrderModel, { IOrder } from '../models/Order.model'

async function create(order: Omit<IOrder, 'order_id'>): Promise<IOrder> {
  const createdOrder = await OrderModel.create({
    ...order,
  })
  return createdOrder.toJSON()
}

async function findAll(): Promise<IOrder[]> {
  const orders = await OrderModel.findAll({ where: { is_deleted: false } })
  return orders.map((order) => order.toJSON())
}

async function deleteById(id: number) {
  const deletedOrder = await OrderModel.update(
    { is_deleted: true },
    { where: { order_id: id } },
  )
  return deletedOrder
}

export default { create, findAll, deleteById }
