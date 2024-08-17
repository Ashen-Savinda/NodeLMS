const Class = require('../models/timetableModel');
const mongoose = require('mongoose')

// get all classes
const getClasses = async (req, res) => {

    const classes = await Class.find()

    res.status(200).json(classes)
}

// get all my classes
const getMyClasses = async (req, res) => {
  const {id} = req.params

  const classes = await Class.find({ course: id })

  res.status(200).json(classes)
}

// get a single workout
const getClass = async (req, res) => {
    const { id } = req.params
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such class'})
    }

    const classes = await Class.findById(id)

    if (!classes) {
        return res.status(404).json({error: 'No such class'})
    }

    res.status(200).json(classes)
}

// create new workout
const createClass = async (req, res) => {
    const { course , day, startTime, endTime, faculty, location } = req.body

    let emptyFields = []

    // if(!course) {
    //     emptyFields.push('Course ID')
    // }
    if(!day) {
        emptyFields.push('Day')
    }
    if(!startTime) {
        emptyFields.push('Start Time')
    }
    if(!endTime) {
        emptyFields.push('End Time')
    }
    // if(!faculty) {
    //     emptyFields.push('Faculty')
    // }
    if(!location) {
        emptyFields.push('Location')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    // add doc to db
    try {
        const savedClass = await Class.create({course , day, startTime, endTime, faculty, location})
        res.status(200).json(savedClass)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteClass = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such class'})
    }

    const deletedClass = await Class.findOneAndDelete({_id: id})

    if (!deletedClass) {
        return res.status(404).json({error: 'No such class'})
    }

    res.status(200).json(deletedClass)
}

// update a workout
const updateClass = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such class'})
    }

    const updatedClass = await Class.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!updatedClass) {
        return res.status(404).json({error: 'No such class'})
    }

    res.status(200).json(updatedClass)
}


module.exports = {
    getClasses,
    getMyClasses,
    getClass,
    createClass,
    deleteClass,
    updateClass
}




































// Create a new timetable
exports.createTimetableEntry = async (req, res) => {
  try {
    const newTimetableEntry = new Timetable(req.body);
    const savedTimetableEntry = await newTimetableEntry.save();
    res.status(201).json(savedTimetableEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all timetables
exports.getAllTimetableEntries = async (req, res) => {
  try {
    const timetableEntries = await Timetable.find();
    res.json(timetableEntries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get timetable by ID
exports.getTimetableEntryById = async (req, res) => {
  try {
    const timetableEntry = await Timetable.findById(req.params.id);
    if (!timetableEntry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }
    res.json(timetableEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update timetable
exports.updateTimetableEntry = async (req, res) => {
  try {
    const updatedTimetableEntry = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTimetableEntry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }
    res.json(updatedTimetableEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete timetable
exports.deleteTimetableEntry = async (req, res) => {
  try {
    const deletedTimetableEntry = await Timetable.findByIdAndDelete(req.params.id);
    if (!deletedTimetableEntry) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }
    res.json({ message: 'Timetable entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
