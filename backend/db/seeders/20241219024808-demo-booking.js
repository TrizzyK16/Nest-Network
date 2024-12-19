'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2024-12-20T09:00:00'),
        endDate: new Date('2024-12-20T12:00:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2024-12-21T10:00:00'),
        endDate: new Date('2024-12-21T14:00:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2024-12-22T08:00:00'),
        endDate: new Date('2024-12-22T11:00:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
