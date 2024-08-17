const express = require('express')
const { 
    getClasses,
    getMyClasses,
    getClass,
    createClass,
    deleteClass,
    updateClass,
    
 } = require('../controllers/timetableController')

 const requireAuth = require('../middleware/requireAuth')
 const requireAdminAuth = require('../middleware/requireAdminAuth')
 const requireAdminOrFacultyAuth = require('../middleware/requireAdminOrFacultyAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getClasses)

// GET all my workouts
router.get('/my/:id', getMyClasses)

// GET a single workout
router.get('/:id', getClass)

router.use(requireAdminOrFacultyAuth)

// POST a new workout
router.post('/', createClass)

// DELETE a workout
router.delete('/:id', deleteClass)

// UPDATE a workout
router.put('/:id', updateClass)



module.exports = router