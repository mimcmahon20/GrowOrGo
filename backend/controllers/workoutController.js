const Workout = require('../models/Workout');

// Create a new workout
exports.createWorkout = async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.json(workout);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all workouts for a user
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.params.userId });
    res.json(workouts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(workout);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    await Workout.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Workout deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
