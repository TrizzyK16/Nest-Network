'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");
//LINES 6-9 (NICE) SHOULD BE INCLUDED BUT NOT NEEDED SPECIFICALLY FOR SEEDERS
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo1@user.io',
        username: 'Demo-lition1',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Triston',
        lastName: 'Stinky'
      },
      {
        email: 'demo2@user.io',
        username: 'Demo-lition2',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Triston',
        lastName: 'Stinky'
      },
      {
        email: 'demo3@user.io',
        username: 'Demo-lition3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Triston',
        lastName: 'Stinky'
      }
    ], { validate: true })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition1', 'Demo-lition2', 'Demo-lition3'] }
    }, {});
  }
};
