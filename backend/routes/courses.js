const express = require('express')
const { 
    getCourses,
    getMyCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse,
    
 } = require('../controllers/courseController')

 const requireAuth = require('../middleware/requireAuth')
 const requireAdminAuth = require('../middleware/requireAdminAuth')
 const requireAdminOrFacultyAuth = require('../middleware/requireAdminOrFacultyAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getCourses)

// GET all my workouts
router.get('/my/:id', getMyCourses)

// GET a single workout
router.get('/:id', getCourse)

router.use(requireAdminOrFacultyAuth)

// POST a new workout
router.post('/', createCourse)

// DELETE a workout
router.delete('/:id', deleteCourse)

router.use(requireAdminAuth)

// UPDATE a workout
router.put('/:id', updateCourse)



module.exports = router