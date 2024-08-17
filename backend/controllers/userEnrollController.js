const UserEnroll = require('../models/userEnrollModel')
const mongoose = require('mongoose')

// get all workouts
const getEnrollments = async (req, res) => {

    const enrollments = await UserEnroll.find()

    res.status(200).json(enrollments)
}

// get all my workouts
const getMyEnrollments = async (req, res) => {
  const {id} = req.params
  console.log('ididid',id)

  const enrollments = await UserEnroll.find({ uid: id })
  console.log('enenenen',enrollments)

  res.status(200).json(enrollments)
}

const getEnrollment = async (req, res) => {
    const { uid, cid } = req.params;
    console.log(uid, cid);

    
    try {
        const enrollment = await UserEnroll.findOne({ uid, cid });

        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        res.status(200).json(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// create new workout
const createUserEnroll = async (req, res) => {
    const {uid, cid, email, course} = req.body

    // add doc to db
    try {
        const enroll = await UserEnroll.create({uid, cid, email, course})
        res.status(200).json(enroll)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteEnroll = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such enrollment'})
    }

    const enroll = await UserEnroll.findOneAndDelete({_id: id})

    if (!enroll) {
        return res.status(404).json({error: 'No such enrollment'})
    }

    res.status(200).json(enroll)
}

// // update a workout
// const updateCourse = async (req, res) => {
//     const { id } = req.params
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such course'})
//     }

//     const course = await Course.findOneAndUpdate({_id: id}, {
//         ...req.body
//     })

//     if (!course) {
//         return res.status(404).json({error: 'No such course'})
//     }

//     res.status(200).json(course)
// }


module.exports = {
    getEnrollments,
    getMyEnrollments,
    getEnrollment,
    createUserEnroll,
    deleteEnroll
}