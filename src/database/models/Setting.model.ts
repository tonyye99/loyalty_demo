import { Table, Model, Column, DataType, Default } from 'sequelize-typescript'

export interface ISetting {
  setting_id: number
  name: string
  value: string
  is_deleted?: boolean
  modified_by?: number
}

@Table({
  tableName: 'settings',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  deletedAt: 'deleted_at',
})
export default class SettingModel extends Model implements ISetting {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  setting_id!: number

  @Column({ type: DataType.STRING })
  name!: string

  @Column({ type: DataType.STRING })
  value!: string

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  is_deleted!: boolean

  @Column({ type: DataType.INTEGER })
  modified_by?: number
}
