'use strict';
const { SpotImage } = require('../models');

// Lines 6-9 (NICE) SHOULD BE INCLUDED BUT NOT NEEDED SPECIFICALLY FOR SEEDERS
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
        url: 'https://picsum.photos/800/600?random=1',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://picsum.photos/800/600?random=2',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://picsum.photos/800/600?random=3',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://picsum.photos/800/600?random=4',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://picsum.photos/800/600?random=5',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://picsum.photos/800/600?random=6',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://picsum.photos/800/600?random=7',
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
        [Op.like]: 'https://picsum.photos/800/600?random=%'
      }
    });
  }
};