const express = require('express')

//controller functions
const { 
    registerUser, 
    loginUser, 
    getMe, 
    getAllFaculties
} = require('../controllers/userController')


const requireAdminAuth = require('../middleware/requireAdminAuth')

const router = express.Router()

//login
router.post('/login', loginUser)


//signup
router.post('/signup', registerUser)


router.use(requireAdminAuth)

//get all faculties
router.get('/faculties', getAllFaculties)




module.exports = router