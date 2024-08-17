const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { 
    type: String, 
    required: true 
  },
  cCode: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String 
  },
  credits: { 
    type: Number, 
    required: true
  },
  faculty: { 
    type: String
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
