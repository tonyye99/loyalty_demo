import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  Default,
} from 'sequelize-typescript'
import CustomerModel from './Customer.model'
import ShoppingCartModel from './ShoppingCart.model'

export interface IOrder {
  order_id: number
  merchant: string
  payment_intent_id: string
  customer_id: number
  cart_id: number
  subtotal: number
  total: number
  order_date: Date
  points_awarded: number
  is_deleted?: boolean
}

@Table({
  tableName: 'orders',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class OrderModel extends Model implements IOrder {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  order_id!: number

  @Column({ type: DataType.STRING })
  merchant!: string

  @Column({ type: DataType.STRING })
  payment_intent_id!: string

  @ForeignKey(() => CustomerModel)
  @Column({ type: DataType.INTEGER })
  customer_id!: number

  @ForeignKey(() => ShoppingCartModel)
  @Column({ type: DataType.INTEGER })
  cart_id!: number

  @Column({ type: DataType.DECIMAL })
  subtotal!: number

  @Column({ type: DataType.DECIMAL })
  total!: number

  @Column({ type: DataType.DATE })
  order_date!: Date

  @Column({ type: DataType.INTEGER })
  points_awarded!: number

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_deleted!: boolean
}
