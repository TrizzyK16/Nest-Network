"use strict";

const { Review } = require("../models");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Review.bulkCreate([
      {
        userId: 1,
        spotId: 1,
        review: "Absolutely loved this place! Highly recommended.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 1,
        review: "Nice spot but a bit noisy at night.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 1,
        review: "Good experience but room for improvement.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 2,
        review: "Decent place, but could use some improvements.",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 3,
        review: "Not as expected. Will not return.",
        stars: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { validate: true });
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      [Op.or]: [
        { userId: 1, spotId: 1 },
        { userId: 2, spotId: 1 },
        { userId: 3, spotId: 1 },
        { userId: 2, spotId: 2 },
        { userId: 3, spotId: 3 }
      ]
    });
  },
};
