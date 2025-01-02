'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch Category and Instructor IDs to maintain foreign key constraints
    const   categories = await queryInterface.sequelize.query(
      `SELECT id, name from Categories;`
    );

    const instructors = await queryInterface.sequelize.query(
      `SELECT id, name from Instructors;`
    );

    const categoryRows = categories[0];
    const instructorRows = instructors[0];

    // Mapping categories and instructors for easy reference
    const categoryMap = {};
    categoryRows.forEach(category => {
      categoryMap[category.name] = category.id;
    });

    const instructorMap = {};
    instructorRows.forEach(instructor => {
      instructorMap[instructor.name] = instructor.id;
    });

    await queryInterface.bulkInsert('Courses', [
      {
        category_id: categoryMap['Programming'],
        instructor_id: instructorMap['Alice Johnson'],
        title: 'JavaScript for Beginners',
        price: 49.99,
        img: 'https://static.skillshare.com/uploads/video/thumbnails/0ab63be061d2a2051fc5a20337d2bc7f/original',
        ratings: 5,
        time: 120,
        lesson: 20,
        description: 'Learn the fundamentals of JavaScript programming with hands-on examples and interactive exercises. Perfect for beginners looking to kickstart their coding journey.',
        enrolled_count: 1200,
        course_level: 'Beginner',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Programming'],
        instructor_id: instructorMap['Alice Johnson'],
        title: 'Advanced Node.js Development',
        price: 79.99,
        img: 'https://creator-assets.codedamn.com/codedamn-61897bfe60f1140008feb00d/course-image/2022-09-23/13ea008213599bd4b103132cdd594ec7835f0391',
        ratings: 5,
        time: 180,
        lesson: 30,
        description: 'Delve deeper into Node.js with this advanced course covering performance optimization, testing, and deployment strategies.',
        enrolled_count: 850,
        course_level: 'Advanced',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Design'],
        instructor_id: instructorMap['Bob Smith'],
        title: 'UI/UX Design Fundamentals',
        price: 59.99,
        img: 'https://www.aim.com.au/sites/default/files/00960_AIM_Screens_UXDesignFundamentals_640x360.jpg',
        ratings: 5,
        time: 150,
        lesson: 25,
        description: 'Master the essentials of user interface and user experience design. This course covers design principles, prototyping, and usability testing for aspiring designers.',
        enrolled_count: 950,
        course_level: 'Intermediate',
        language: 'France',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Design'],
        instructor_id: instructorMap['Bob Smith'],
        title: 'Advanced Photoshop Techniques',
        price: 69.99,
        img: 'https://i.ytimg.com/vi/ObKsCs5mYGQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBw2OjrnhZk0-4KA27T0dZyC9y13Q',
        ratings: 5,
        time: 140,
        lesson: 22,
        description: 'Enhance your design skills with advanced Photoshop techniques including photo manipulation, digital painting, and retouching.',
        enrolled_count: 700,
        course_level: 'Advanced',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Marketing'],
        instructor_id: instructorMap['Carol Davis'],
        title: 'SEO Strategies for 2024',
        price: 39.99,
        img: 'https://www.fctraining.org/img/elevate-seo-strategies-2024.webp',
        ratings: 5,
        time: 90,
        lesson: 15,
        description: 'Stay ahead in the digital marketing game with the latest SEO strategies. Learn techniques to improve website rankings, drive traffic, and increase conversions.',
        enrolled_count: 1100,
        course_level: 'Intermediate',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Marketing'],
        instructor_id: instructorMap['Carol Davis'],
        title: 'Content Marketing 101',
        price: 49.99,
        img: 'https://media.licdn.com/dms/image/C4D12AQEUj0fCfoEFHg/article-cover_image-shrink_720_1280/0/1520179738024?e=2147483647&v=beta&t=gzaIITKt_Q8QUL5lmdw08gFdpcZP0jAJN3I0n8FfPNA',
        ratings: 5,
        time: 100,
        lesson: 18,
        description: 'Learn the basics of content marketing, including planning, writing, and distributing engaging content to grow your brand.',
        enrolled_count: 900,
        course_level: 'Beginner',
        language: 'France',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Business'],
        instructor_id: instructorMap['David Lee'],
        title: 'Startup Scaling Essentials',
        price: 69.99,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1w_mfjOMROV7hiNr0XjcPKfymk3yWAXTYyg&s',
        ratings: 5,
        time: 180,
        lesson: 30,
        description: 'Unlock the secrets to scaling your startup. This course dives into strategies for growth, funding, team building, and market expansion.',
        enrolled_count: 750,
        course_level: 'Advanced',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Business'],
        instructor_id: instructorMap['David Lee'],
        title: 'Business Model Canvas',
        price: 59.99,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1w_mfjOMROV7hiNr0XjcPKfymk3yWAXTYyg&s',
        ratings: 5,
        time: 150,
        lesson: 25,
        description: 'Learn the key elements of the Business Model Canvas and how to apply it to startup planning and strategy development.',
        enrolled_count: 650,
        course_level: 'Intermediate',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Photography'],
        instructor_id: instructorMap['Eva Green'],
        title: 'Advanced Lighting Techniques',
        price: 29.99,
        img: 'https://i.ytimg.com/vi/e_hW3Xqg0EM/maxresdefault.jpg',
        ratings: 4,
        time: 60,
        lesson: 10,
        description: 'Elevate your photography skills with advanced lighting techniques. Perfect for photographers looking to refine their craft and produce stunning visuals.',
        enrolled_count: 500,
        course_level: 'Advanced',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_id: categoryMap['Photography'],
        instructor_id: instructorMap['Eva Green'],
        title: 'Digital Photography Basics',
        price: 39.99,
        img: 'https://i.ytimg.com/vi/e_hW3Xqg0EM/maxresdefault.jpg',
        ratings: 5,
        time: 90,
        lesson: 15,
        description: 'Learn the fundamentals of digital photography, including camera settings, composition, and lighting for stunning photos.',
        enrolled_count: 450,
        course_level: 'Beginner',
        language: 'English',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
