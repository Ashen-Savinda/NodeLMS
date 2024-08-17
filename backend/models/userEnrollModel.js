const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userEnrollSchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    cid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserEnroll', userEnrollSchema)

