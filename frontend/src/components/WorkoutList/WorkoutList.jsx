import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkoutsAsync, selectWorkouts } from '../../redux/slices/workoutSlice';
import { selectAuth } from '../../redux/slices/authSlice';
import WorkoutForm from '../WorkoutForm/WorkoutForm';

function WorkoutList() {
  const dispatch = useDispatch();
  const workouts = useSelector(selectWorkouts);
  const status = useSelector((state) => state.workout.status);
  const error = useSelector((state) => state.workout.error);
  const {user} = useSelector(selectAuth);

  console.log(user._id);

  console.log(workouts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getWorkoutsAsync(user._id));
    }
  }, [status, dispatch, user]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <WorkoutForm></WorkoutForm>
      <h1>Your Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id} onClick={() => handleWorkoutClick(workout)}>
            {workout.date.substring(0,10)} - {workout.exercises[0].name}
          </li>
        ))}
      </ul>
    </div>
  );

  function handleWorkoutClick(workout) {
    // Function to handle when a workout is clicked
    // This could navigate to a detailed view of the workout
  }
}

export default WorkoutList;
