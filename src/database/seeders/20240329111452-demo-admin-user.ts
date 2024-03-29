'use strict'
import { QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        api_key_id: 1,
        name: 'demo-admin',
        email: 'HJ3p6@example.com',
        status: true,
        is_admin: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface: QueryInterface) {
    {
      return queryInterface.bulkDelete('users', {}, {})
    }
  },
}
