const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  exercises: [
    {
      name: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      weight: {
        type: Number
      },
      distance: {
        type: Number
      }
    }
  ],
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
