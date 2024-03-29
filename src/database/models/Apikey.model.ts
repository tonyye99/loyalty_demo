import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  Validate,
} from 'sequelize-typescript'

export enum Permission {
  GENERAL = 'GENERAL',
}

export interface IApiKey {
  apiKey_id: number
  key: string
  key_version: number
  permissions: string
  comments: string
  status?: boolean
}

@Table({
  tableName: 'apikeys',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class ApiKeyModel extends Model implements IApiKey {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  apiKey_id!: number

  @AllowNull(false)
  @Validate({
    notNull: {
      msg: 'key is required',
    },
  })
  @Column({ type: DataType.STRING })
  key!: string

  @Column({ type: DataType.INTEGER })
  key_version!: number

  @Column({ type: DataType.ENUM(Permission.GENERAL) })
  permissions!: string

  @Column({ type: DataType.TEXT })
  comments!: string

  @Column({ type: DataType.BOOLEAN })
  status?: boolean
}
