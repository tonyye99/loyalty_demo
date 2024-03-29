'use strict'
import { QueryInterface, DataTypes } from 'sequelize'
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('products', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      point_cost: {
        type: Sequelize.INTEGER,
      },
      stock_quantity: {
        type: Sequelize.INTEGER,
      },
      modified_by: {
        type: Sequelize.INTEGER,
      },
      last_modified: {
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
    await queryInterface.dropTable('Products')
  },
}
