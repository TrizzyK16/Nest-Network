'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

// Include schema options for production
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if DemoUser already exists
    const [existingDemoUser] = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE username = 'DemoUser';`
    );

    if (existingDemoUser.length === 0) {
      // If DemoUser does not exist, insert the user
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
        },
        {
          email: 'demo@user.com',
          username: 'DemoUser',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Demo',
          lastName: 'User'
        },
      ], { validate: true });
    } else {
      console.log('DemoUser already exists, skipping insertion.');
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition1', 'Demo-lition2', 'Demo-lition3', 'DemoUser'] }
    }, {});
  }
};