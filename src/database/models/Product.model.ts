import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  Validate,
  HasMany,
  Default,
} from 'sequelize-typescript'
import ShoppingCartItemsModel from './ShoppingCartItems.model'

export interface IProduct {
  product_id: number
  product_name: string
  product_description: string
  price: number
  point_cost: number
  stock_quantity: number
  modified_by: number
  last_modified: Date
  is_deleted?: boolean
}

@Table({
  tableName: 'products',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class ProductModel extends Model implements IProduct {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  product_id!: number

  @Column({ type: DataType.STRING })
  product_name!: string

  @Column({ type: DataType.STRING })
  product_description!: string

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'price is required',
    },
  })
  @Column({ type: DataType.DECIMAL })
  price!: number

  @Column({ type: DataType.INTEGER })
  point_cost!: number

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'stock_quantity is required',
    },
  })
  @Column({ type: DataType.INTEGER })
  stock_quantity!: number

  @Column({ type: DataType.INTEGER })
  modified_by!: number

  @Column({ type: DataType.DATE })
  last_modified!: Date

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_deleted!: boolean

  @HasMany(() => ShoppingCartItemsModel)
  items!: ShoppingCartItemsModel[]
}
