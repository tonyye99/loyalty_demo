import CustomerModel, { ICustomer } from '../models/Customer.model'

async function create(
  customer: Omit<ICustomer, 'customer_id'>,
): Promise<ICustomer> {
  const createdCustomer = await CustomerModel.create({
    ...customer,
  })
  return createdCustomer.toJSON()
}

async function update(id: number, customer: ICustomer) {
  const updatedCustomer = await CustomerModel.update(customer, {
    where: { customer_id: id },
  })
  return updatedCustomer ? findById(id) : null
}

async function findById(id: number): Promise<ICustomer | null> {
  const customer = await CustomerModel.findByPk(id)
  return customer ? customer.toJSON() : null
}

async function findAll(): Promise<ICustomer[]> {
  const customers = await CustomerModel.findAll({
    where: { is_deleted: false },
  })
  return customers.map((customer) => customer.toJSON())
}

async function deleteById(id: number): Promise<ICustomer | null> {
  const deletedCustomer = await CustomerModel.update(
    { is_deleted: true },
    { where: { customer_id: id } },
  )
  return deletedCustomer ? findById(id) : null
}

async function adjustPoints(
  customerId: number,
  quantity: number,
  mode: 'increment' | 'decrement' = 'increment',
): Promise<ICustomer | null> {
  const customer = await CustomerModel.findByPk(customerId)
  if (!customer) return null

  const result = await customer[mode]('points_balance', { by: quantity })

  return result.toJSON()
}

export default { create, update, findById, findAll, deleteById, adjustPoints }
