const express = require('express')
const { 
    getEnrollments,
    getMyEnrollments,
    getEnrollment,
    createUserEnroll,
    deleteEnroll
    
 } = require('../controllers/userEnrollController')

 const requireAuth = require('../middleware/requireAuth')
 const requireAdminAuth = require('../middleware/requireAdminAuth')
 const requireAdminOrFacultyAuth = require('../middleware/requireAdminOrFacultyAuth')

const router = express.Router()

// require auth for all enrollment routes
router.use(requireAuth)

// POST a new enrollment
router.post('/', createUserEnroll)

// GET a single enrollment
router.get('/:uid/:cid', getEnrollment)

router.use(requireAdminOrFacultyAuth)

// GET all enrollments
router.get('/', getEnrollments)

// GET all my enrollments
router.get('/my/:id', getMyEnrollments)


// DELETE a enrollment
router.delete('/:id', deleteEnroll)

// // UPDATE a enrollment
// router.put('/:id', updateEnroll)



module.exports = router