const express = require('express');
const router = express.Router();
const { createWorkout, getWorkouts, updateWorkout, deleteWorkout } = require('../controllers/workoutController');

router.post('/', createWorkout);
router.get('/user/:userId', getWorkouts);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
