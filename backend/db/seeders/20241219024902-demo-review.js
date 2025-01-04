"use strict";

const { Review } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Review.bulkCreate([
      {
        userId: 1,
        spotId: 1,
        review: "Great spot, had a wonderful time!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        spotId: 1,
        review: "Great spot, had a wonderful time!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        spotId: 1,
        review: "Great spot, had a wonderful time!",
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
    await queryInterface.bulkDelete(options, {
      review: {
        [Op.in]: [
          "Great spot, had a wonderful time!",
          "Decent place, but could use some improvements.",
          "Not as expected. Will not return.",
        ]
      },
    });
  },
};
