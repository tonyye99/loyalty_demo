import SettingModel, { ISetting } from '../models/Setting.model'

async function findByName(name: string): Promise<ISetting | undefined> {
  const setting = await SettingModel.findOne({ where: { name } })
  return setting?.toJSON()
}

async function update(id: number, setting: ISetting) {
  const updatedSetting = await SettingModel.update(setting, {
    where: { setting_id: id },
  })
  return updatedSetting ? findByName(setting.name) : null
}

async function create(setting: ISetting) {
  const createdSetting = await SettingModel.create({
    ...setting,
  })
  return createdSetting.toJSON()
}

async function deleteById(id: number, userId: number) {
  const deletedSetting = await SettingModel.update(
    { is_deleted: true, modified_by: userId },
    { where: { setting_id: id } },
  )
  return deletedSetting
}

async function findAll() {
  const settings = await SettingModel.findAll({ where: { is_deleted: false } })
  return settings.map((setting) => setting.toJSON())
}

export default { findByName, update, create, deleteById, findAll }
