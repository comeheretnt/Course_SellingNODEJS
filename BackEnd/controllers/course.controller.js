const { Courses, Categories, Instructors } = require('../models');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { 
      category_id, 
      instructor_id, 
      title, 
      price, 
      img, 
      ratings, 
      time, 
      lesson, 
      description, 
      enrolled_count, 
      course_level, 
      language 
    } = req.body;

    // Validate input
    if (!category_id || !instructor_id || !title || !price || !time || !lesson) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const course = await Courses.create({
      category_id,
      instructor_id,
      title,
      price,
      img,
      ratings,
      time,
      lesson,
      description,
      enrolled_count,
      course_level,
      language,
    });

    res.status(201).json({ message: 'Course created successfully.', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the course.', error: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.findAll({
      include: [
        { model: Categories, as: 'category', attributes: ['id', 'name'] },
        { model: Instructors, as: 'instructor', attributes: ['id', 'name', 'email', 'enrolled_count', 'bio', 'avatar', 'description'] },
      ],
    });
    res.status(200).json({ message: 'Courses retrieved successfully.', courses });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving courses.', error: error.message });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Courses.findByPk(id, {
      include: [
        { model: Categories, as: 'category', attributes: ['id', 'name'] },
        { model: Instructors, as: 'instructor', attributes: ['id', 'name', 'email', 'enrolled_count', 'bio', 'avatar', 'certified_count', 'enrolled_count', 'rating', 'description' ] },
      ],
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    res.status(200).json({ message: 'Course retrieved successfully.', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the course.', error: error.message });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await Courses.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    await course.update(updates);

    res.status(200).json({ message: 'Course updated successfully.', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the course.', error: error.message });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Courses.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    await course.destroy();

    res.status(200).json({ message: 'Course deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the course.', error: error.message });
  }
};
