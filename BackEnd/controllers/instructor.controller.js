const { Instructors } = require('../models');

// Create a new instructor
exports.createInstructor = async (req, res) => {
  try {
    const { name, email, phone, description, bio, avatar, programs, enrolled_count, certified_count, ratings } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const instructor = await Instructors.create({
      name,
      email,
      phone,
      description,
      bio,
      avatar,
      programs,
      enrolled_count,
      certified_count,
      ratings,
    });

    res.status(201).json({ message: 'Instructor created successfully.', instructor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the instructor.', error: error.message });
  }
};

// Get all instructors
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructors.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'description',
        'bio',
        'avatar',
        'programs',
        'enrolled_count',
        'certified_count',
        'rating',
      ],
    });

    res.status(200).json({ message: 'Instructors retrieved successfully.', instructors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving instructors.', error: error.message });
  }
};

// Get a single instructor by ID
exports.getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await Instructors.findByPk(id, {
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'description',
        'bio',
        'avatar',
        'programs',
        'enrolled_count',
        'certified_count',
        'rating',
      ],
    });

    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found.' });
    }

    res.status(200).json({ message: 'Instructor retrieved successfully.', instructor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the instructor.', error: error.message });
  }
};

// Update an instructor by ID
exports.updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const instructor = await Instructors.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found.' });
    }

    await instructor.update(updates);

    res.status(200).json({ message: 'Instructor updated successfully.', instructor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the instructor.', error: error.message });
  }
};

// Delete an instructor by ID
exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found.' });
    }

    await instructor.destroy();

    res.status(200).json({ message: 'Instructor deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the instructor.', error: error.message });
  }
};
