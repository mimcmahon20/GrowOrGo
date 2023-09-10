import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkoutAsync,
  selectWorkouts,
} from "../../redux/slices/workoutSlice";
import { selectAuth } from "../../redux/slices/authSlice";

function WorkoutForm() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const { loading, error } = useSelector(selectWorkouts);

  const [workoutData, setWorkoutData] = useState({
    user: user._id,
    date: "",
    exercises: [{ name: "Bench Press", category: "Chest", sets: 3 }],
    // ... (other workout attributes)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({
      ...workoutData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(createWorkoutAsync({ ...workoutData, user: user._id }));
    }
  };

  return (
    <div>
      <h2>Add a New Workout</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={workoutData.date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          
        </div>
        {/* ... (other input fields for workout attributes) */}
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
}

export default WorkoutForm;
