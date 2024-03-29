import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript'
import ShoppingCartModel from './ShoppingCart.model'
import ProductModel from './Product.model'

export interface IShoppingCartItems {
  cart_item_id: number
  cart_id: number
  product_id: number
  product: ProductModel
  quantity: number
  is_deleted?: boolean
}

@Table({
  tableName: 'shopping_cart_items',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class ShoppingCartItemsModel
  extends Model
  implements IShoppingCartItems
{
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  cart_item_id!: number

  @ForeignKey(() => ShoppingCartModel)
  @Column({ type: DataType.INTEGER })
  cart_id!: number

  @ForeignKey(() => ProductModel)
  @Column({ type: DataType.INTEGER })
  product_id!: number

  @BelongsTo(() => ProductModel)
  product!: ProductModel

  @Column({ type: DataType.INTEGER })
  quantity!: number

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_deleted!: boolean
}
