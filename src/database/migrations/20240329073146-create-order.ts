'use strict'
import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('orders', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      merchant: {
        type: Sequelize.STRING,
      },
      payment_intent_id: {
        type: Sequelize.STRING,
      },
      customer_id: {
        type: Sequelize.INTEGER,
      },
      cart_id: {
        type: Sequelize.INTEGER,
      },
      subtotal: {
        type: Sequelize.DECIMAL,
      },
      total: {
        type: Sequelize.DECIMAL,
      },
      order_date: {
        type: Sequelize.DATE,
      },
      points_awarded: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Orders')
  },
}
