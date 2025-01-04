'use strict';

const { Booking } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Booking.bulkCreate([
      {
          spotId: 1,
          userId: 1,
          startDate: new Date('2025-12-20'),
          endDate: new Date('2025-12-21')
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date('2025-12-21'),
          endDate: new Date('2025-12-22')
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date('2025-12-22'),
          endDate: new Date('2025-12-23')
        }
    ], { validate: true });
  
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      startDate: {
        [Op.in]: [
          new Date('2024-12-20'),
          new Date('2024-12-21'),
          new Date('2024-12-22')
        ]
      }
    });
  }
};
