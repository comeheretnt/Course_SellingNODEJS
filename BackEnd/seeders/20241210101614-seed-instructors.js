'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Instructors', [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '123-456-7890',
        description: 'Alice has over 10 years of experience in software development, mentoring, and education.',
        bio: 'Experienced software developer with a passion for teaching.',
        avatar: 'https://thedigiteachers.com/wp-content/uploads/2020/10/Teaching.png',
        enrolled_count: 1200,
        certified_count: 150,
        programs: JSON.stringify(['JavaScript Mastery', 'Advanced Node.js']),
        rating: 4.8, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob Smith',  
        email: 'bob.smith@example.com',
        phone: '987-654-3210',
        description: 'Bob is an award-winning designer with extensive expertise in creating user-friendly interfaces.',
        bio: 'Creative graphic designer specializing in UI/UX.',
        avatar: 'https://example.com/avatars/bob.jpg',
        enrolled_count: 800,
        certified_count: 80,
        programs: JSON.stringify(['UI/UX Design Fundamentals', 'Advanced Photoshop']),
        rating: 4.5, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Carol Davis',
        email: 'carol.davis@example.com',
        phone: '456-123-7890',
        description: 'Carol excels in crafting digital strategies that drive organic growth and engagement.',
        bio: 'Digital marketing expert with a focus on SEO and content strategy.',
        avatar: 'https://example.com/avatars/carol.jpg',
        enrolled_count: 950,
        certified_count: 95,
        programs: JSON.stringify(['SEO Strategies', 'Content Marketing 101']),
        rating: 4.7, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'David Lee',
        email: 'david.lee@example.com',
        phone: '789-456-1230',
        description: 'David specializes in helping startups and small businesses establish sustainable growth.',
        bio: 'Business consultant helping startups scale efficiently.',
        avatar: 'https://example.com/avatars/david.jpg',
        enrolled_count: 600,
        certified_count: 60,
        programs: JSON.stringify(['Startup Scaling', 'Business Model Canvas']),
        rating: 4.6, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eva Green',
        email: 'eva.green@example.com',
        phone: '321-654-9870',
        description: 'Eva is a professional photographer with a talent for teaching creative lighting techniques.',
        bio: 'Professional photographer and instructor in digital photography.',
        avatar: 'https://example.com/avatars/eva.jpg',
        enrolled_count: 400,
        certified_count: 40,
        programs: JSON.stringify(['Digital Photography Basics', 'Advanced Lighting Techniques']),
        rating: 4.9, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Instructors', null, {});
  }
};