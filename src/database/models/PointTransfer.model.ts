import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  Validate,
  ForeignKey,
  Default,
} from 'sequelize-typescript'
import CustomerModel from './Customer.model'

export interface IPointTransfer {
  point_transfer_id: number
  point_transfer_description?: string
  point_transfer_points: number
  from_customer_id: number
  to_customer_id: number
  transfer_date: Date
  is_deleted?: boolean
}

@Table({
  tableName: 'point_transfers',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class PointTransferModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  point_transfer_id!: number

  @Column({ type: DataType.STRING })
  point_transfer_description!: string

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'point_transfer_points is required',
    },
  })
  @Column({ type: DataType.INTEGER })
  point_transfer_points!: number

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'from_customer_id is required',
    },
  })
  @ForeignKey(() => CustomerModel)
  @Column({ type: DataType.INTEGER })
  from_customer_id!: number

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'to_customer_id is required',
    },
  })
  @ForeignKey(() => CustomerModel)
  @Column({ type: DataType.INTEGER })
  to_customer_id!: number

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'transfer_date is required',
    },
  })
  @Column({ type: DataType.DATE })
  transfer_date!: Date

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_deleted!: boolean
}
