const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  course: { 
    type: String,
    required: true 
  },
  day: { 
    type: Date, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  faculty: { 
    type: String,
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  }
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
