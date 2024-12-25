const express = require('express');
const router = express.Router();

const {
    getAllInstructors,
    createInstructor,
    getInstructorById,
    updateInstructor,
    deleteInstructor
} = require('../controllers/instructor.controller');

router
    .route('/')
    .get(getAllInstructors)
    .post(createInstructor);

router
    .route('/:id')
    .get(getInstructorById)
    .put(updateInstructor)
    .delete(deleteInstructor);

module.exports = router;