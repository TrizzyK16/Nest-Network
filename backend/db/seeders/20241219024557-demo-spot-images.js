'use strict';
const { SpotImage } = require('../models');
//LINES 6-9 (NICE) SHOULD BE INCLUDED BUT NOT NEEDED SPECIFICALLY FOR SEEDERS
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return SpotImage.bulkCreate([
      {
            spotId: 1,
            url: 'https://example.com/image1.jpg',
            preview: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 1,
            url: 'https://example.com/image2.jpg',
            preview: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 2,
            url: 'https://example.com/image3.jpg',
            preview: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 2,
            url: 'https://example.com/image4.jpg',
            preview: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            spotId: 3,
            url: 'https://example.com/image5.jpg',
            preview: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
     ]);

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete('SpotImages', null, {});
  }
};
