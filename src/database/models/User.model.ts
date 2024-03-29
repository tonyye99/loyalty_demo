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
import ApiKeyModel from './Apikey.model'

export interface IUser {
  user_id: number
  api_key_id: number
  name: string
  email: string
  status?: boolean
  is_admin?: boolean
  is_deleted?: boolean
}

@Table({
  tableName: 'users',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class UserModel extends Model implements IUser {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  user_id!: number

  @ForeignKey(() => ApiKeyModel)
  @Column({ type: DataType.INTEGER })
  api_key_id!: number

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'name is required',
    },
  })
  @Column({ type: DataType.STRING })
  name!: string

  @Column({ type: DataType.STRING })
  email!: string

  @Column({ type: DataType.BOOLEAN })
  status?: boolean

  @Column({ type: DataType.BOOLEAN })
  is_admin?: boolean

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_deleted!: boolean
}
