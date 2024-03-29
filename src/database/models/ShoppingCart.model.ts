import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Default,
} from 'sequelize-typescript'
import CustomerModel from './Customer.model'
import ShoppingCartItemsModel from './ShoppingCartItems.model'

export interface IShoppingCart {
  cart_id: number
  customer_id: number
  redeemed_points: number
  is_deleted?: boolean
  items: ShoppingCartItemsModel[]
}

@Table({
  tableName: 'shopping_carts',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class ShoppingCartModel extends Model implements IShoppingCart {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  cart_id!: number

  @ForeignKey(() => CustomerModel)
  @Column({ type: DataType.INTEGER })
  customer_id!: number

  @Column({ type: DataType.DECIMAL })
  redeemed_points!: number

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_deleted!: boolean

  @HasMany(() => ShoppingCartItemsModel)
  items!: ShoppingCartItemsModel[]
}
