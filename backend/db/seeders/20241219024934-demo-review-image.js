'use strict';

const { ReviewImage } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    return ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://example.com/image1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 1,
        url: 'https://example.com/image2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 2,
        url: 'https://example.com/image3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 3,
        url: 'https://example.com/image4.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: {
        [Op.in]: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg', 'https://example']}
    })
  }
};
