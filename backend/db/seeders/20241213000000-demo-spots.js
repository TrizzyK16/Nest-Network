'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = process.env.NODE_ENV === 'production' && process.env.SCHEMA 
      ? `"${process.env.SCHEMA}"."Spots"` 
      : "Spots";
  
    const spotNames = [
      'Cozy SF Apartment', 
      'Beachfront Villa', 
      'Downtown Loft', 
      'Beachfront Paradise', 
      'Cozy Mountain Cabin'
    ];
  
    const [existingSpots] = await queryInterface.sequelize.query(
      `SELECT name FROM ${tableName} WHERE name IN ('${spotNames.join("','")}');`
    );
  
    const existingSpotNames = existingSpots.map(spot => spot.name);
  
    const spotsToCreate = [
      {
        ownerId: 1,
        address: '123 Main St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Cozy SF Apartment',
        description: 'A beautiful and cozy apartment in the heart of San Francisco.',
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '456 Beach Rd',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Beachfront Villa',
        description: 'A luxurious beachfront villa with stunning ocean views.',
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: '789 Downtown Ave',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Downtown Loft',
        description: 'A modern loft in the heart of New York City.',
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 4,
        address: '456 Oceanview Drive',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Beachfront Paradise',
        description: 'A stunning beachfront property with breathtaking ocean views.',
        price: 450,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 5,
        address: '321 Mountain Retreat Rd',
        city: 'Aspen',
        state: 'Colorado',
        country: 'USA',
        lat: 39.1911,
        lng: -106.8175,
        name: 'Cozy Mountain Cabin',
        description: 'A warm and inviting cabin nestled in the Aspen mountains.',
        price: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ].filter(spot => !existingSpotNames.includes(spot.name));
  
    if (spotsToCreate.length) {
      return Spot.bulkCreate(spotsToCreate);
    } else {
      console.log('All spots already exist, skipping insertion.');
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Cozy SF Apartment', 'Beachfront Villa', 'Downtown Loft'] }
    }, {
    });
  }
};
