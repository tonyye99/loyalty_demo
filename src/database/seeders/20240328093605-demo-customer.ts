'use strict'
import { QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('customers', [
      {
        customer_id: 1,
        customer_first_name: 'John',
        customer_last_name: 'Doe',
        email: 'johndoe@example.com',
        points_balance: 0,
        eligible_to_redeem_points: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface: QueryInterface) {
    {
      return queryInterface.bulkDelete('customers', {}, {})
    }
  },
}
