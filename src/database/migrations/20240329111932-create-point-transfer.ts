'use strict'
import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('point_transfers', {
      point_transfer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      point_transfer_description: {
        type: Sequelize.STRING,
      },
      point_transfer_points: {
        type: Sequelize.INTEGER,
      },
      from_customer_id: {
        type: Sequelize.INTEGER,
      },
      to_customer_id: {
        type: Sequelize.INTEGER,
      },
      transfer_date: {
        type: Sequelize.DATE,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('PointTransfers')
  },
}
