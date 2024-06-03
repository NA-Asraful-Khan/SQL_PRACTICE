'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories',[
      {
        name:'Nodejs'
      },
      {
        name:'Vue js'
      },
      {
        name:'React js'
      },
      {
        name:'Angular js'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories',{},null)
  }
};
