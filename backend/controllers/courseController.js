const Course = require('../models/courseModel')
const mongoose = require('mongoose')

// get all workouts
const getCourses = async (req, res) => {

    const courses = await Course.find()

    res.status(200).json(courses)
}

// get all my workouts
const getMyCourses = async (req, res) => {
  const {id} = req.user._id

  const courses = await Course.find({ user_id: id })

  res.status(200).json(courses)
}

// get a single workout
const getCourse = async (req, res) => {
    const { id } = req.params
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const courses = await Course.findById(id)

    if (!courses) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(courses)
}

// create new workout
const createCourse = async (req, res) => {
    const {courseName, cCode, description, credits} = req.body

    let emptyFields = []

    if(!courseName) {
        emptyFields.push('Course Name')
    }
    if(!cCode) {
        emptyFields.push('Course Code')
    }
    if(!description) {
        emptyFields.push('Description')
    }
    if(!credits) {
      emptyFields.push('Credits')
  }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // add doc to db
    try {
        const course = await Course.create({courseName, cCode, description, credits})
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteCourse = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndDelete({_id: id})

    if (!course) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
}

// update a workout
const updateCourse = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such course'})
    }

    const course = await Course.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!course) {
        return res.status(404).json({error: 'No such course'})
    }

    res.status(200).json(course)
}


module.exports = {
    getCourses,
    getMyCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
}