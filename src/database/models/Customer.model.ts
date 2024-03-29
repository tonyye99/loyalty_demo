import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  Validate,
  Default,
} from 'sequelize-typescript'

export interface ICustomer {
  customer_id: number
  customer_first_name: string
  customer_last_name: string
  email: string
  points_balance: number
  eligible_to_redeem_points: boolean
  is_deleted?: boolean
}

@Table({
  tableName: 'customers',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class CustomerModel extends Model implements ICustomer {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  customer_id!: number

  @Column({ type: DataType.STRING })
  customer_first_name!: string

  @Column({ type: DataType.STRING })
  customer_last_name!: string

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'email is required',
    },
  })
  @Column({ type: DataType.STRING })
  email!: string

  @Column({ type: DataType.DECIMAL })
  points_balance!: number

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_deleted!: boolean

  @Column({ type: DataType.BOOLEAN })
  eligible_to_redeem_points!: boolean
}
