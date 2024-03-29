'use strict'
import { QueryInterface } from 'sequelize'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('apikeys', [
      {
        key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
        key_version: 1,
        permissions: 'GENERAL',
        comments: 'Demo API key',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('apikeys', {}, {})
  },
}
