'use strict';
const { SpotImage } = require('../models');
//LINES 6-9 (NICE) SHOULD BE INCLUDED BUT NOT NEEDED SPECIFICALLY FOR SEEDERS
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
     return SpotImage.bulkCreate([
      {
            spotId: 1,
            url: 'https://picsum.photos/800/600',
            preview: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 1,
            url: 'https://picsum.photos/800/600',
            preview: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 2,
            url: 'https://picsum.photos/800/600',
            preview: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 2,
            url: 'https://picsum.photos/800/600',
            preview: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 3,
            url: 'https://picsum.photos/800/600',
            preview: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 4,
            url: 'https://picsum.photos/800/600',
            preview: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 5,
            url: 'https://picsum.photos/800/600',
            preview: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
     ]);

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ['https://picsum.photos/800/600', 'https://picsum.photos/800/600', 'https://picsum.photos/800/600', 'https://picsum.photos/800/600', 'https://picsum.photos/800/600', 'https://picsum.photos/800/600', 'https://picsum.photos/800/600']
      }
    });
  }
};
