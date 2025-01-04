'use strict';

const { Booking } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Booking.bulkCreate([
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
    ], { validate: true });
  
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      startDate: {
        [Op.in]: [
          new Date('2024-12-20T09:00:00'),
          new Date('2024-12-21T10:00:00'),
          new Date('2024-12-22T08:00:00')
        ]
      }
    });
  }
};
