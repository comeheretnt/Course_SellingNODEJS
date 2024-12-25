const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controllers/course.controller');

router 
    .route('/')
    .get(getAllCourses)
    .post(createCourse);

router
    .route('/:id')
    .get(getCourseById)
    .put(updateCourse)
    .delete(deleteCourse);

module.exports = router;    