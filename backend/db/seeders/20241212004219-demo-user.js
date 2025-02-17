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
    const tableName = process.env.NODE_ENV === 'production' && process.env.SCHEMA 
      ? `"${process.env.SCHEMA}"."Users"` 
      : "Users";
  
    const usernames = ['Demo-lition1', 'Demo-lition2', 'Demo-lition3', 'DemoUser'];
  
    const [existingUsers] = await queryInterface.sequelize.query(
      `SELECT username FROM ${tableName} WHERE username IN ('${usernames.join("','")}');`
    );
  
    const existingUsernames = existingUsers.map(user => user.username);
  
    const usersToCreate = [
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
      }
    ].filter(user => !existingUsernames.includes(user.username));
  
    if (usersToCreate.length) {
      return User.bulkCreate(usersToCreate, { validate: true });
    } else {
      console.log('All users already exist, skipping insertion.');
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition1', 'Demo-lition2', 'Demo-lition3', 'DemoUser'] }
    }, {});
  }
};