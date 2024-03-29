import ProductModel, { IProduct } from '../models/Product.model'

async function create(product: IProduct): Promise<ProductModel> {
  const now = new Date()
  product.last_modified = now

  const createdProduct = await ProductModel.create({
    ...product,
  })
  return createdProduct.toJSON()
}

async function findAll(): Promise<IProduct[]> {
  const products = await ProductModel.findAll({ where: { is_deleted: false } })
  return products.map((product) => product.toJSON())
}

async function findById(id: number): Promise<IProduct | null> {
  const product = await ProductModel.findByPk(id)
  return product ? product.toJSON() : null
}

async function findByIds(ids: number[]): Promise<IProduct[]> {
  const products = await ProductModel.findAll({ where: { product_id: ids } })
  return products.map((product) => product.toJSON())
}

async function update(id: number, product: IProduct): Promise<IProduct | null> {
  const now = new Date()
  product.last_modified = now
  const updatedProduct = await ProductModel.update(product, {
    where: { product_id: id },
  })
  return updatedProduct ? findById(id) : null
}

async function adjustStock(
  productId: number,
  quantity: number,
  mode: 'increment' | 'decrement' = 'increment',
): Promise<IProduct | null> {
  const product = await ProductModel.findByPk(productId)
  if (!product) return null

  const result = await product[mode]('stock_quantity', { by: quantity })

  return result.toJSON()
}

async function deleteById(
  id: number,
  userId: number,
): Promise<IProduct | null> {
  const deletedProduct = await ProductModel.update(
    { is_deleted: true, modified_by: userId },
    { where: { product_id: id } },
  )
  return deletedProduct ? findById(id) : null
}

export default {
  create,
  findAll,
  findById,
  findByIds,
  update,
  adjustStock,
  deleteById,
}
