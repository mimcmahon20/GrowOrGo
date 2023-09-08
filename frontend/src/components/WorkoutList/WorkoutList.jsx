import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkoutsAsync, selectWorkouts } from '../../redux/slices/workoutSlice';

function WorkoutList({ userId }) {
  const dispatch = useDispatch();
  const workouts = useSelector(selectWorkouts);
  const status = useSelector((state) => state.workout.status);
  const error = useSelector((state) => state.workout.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getWorkoutsAsync(userId));
    }
  }, [status, dispatch, userId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Your Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id} onClick={() => handleWorkoutClick(workout)}>
            {workout.date} - {workout.type}
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
