'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Programming',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Design',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Marketing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Business',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Photography',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
