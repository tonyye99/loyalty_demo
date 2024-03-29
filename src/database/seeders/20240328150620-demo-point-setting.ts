'use strict'
import { QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('settings', [
      {
        name: 'points',
        value: '0.1',
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface: QueryInterface) {
    {
      return queryInterface.bulkDelete('settings', {}, {})
    }
  },
}
