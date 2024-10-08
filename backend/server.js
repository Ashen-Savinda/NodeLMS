require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const courseRoutes = require('./routes/courses')
const timetableRoutes = require('./routes/timetable')
const enrollmentRoutes = require('./routes/enrollments')


// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/timetables', timetableRoutes)
app.use('/api/enrollments', enrollmentRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB')
            console.log("Listening on port: ", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })
    

    module.exports = app