import { createSlice } from '@reduxjs/toolkit';

export const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    workouts: [],
  },
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload;
    },
    addWorkout: (state, action) => {
      state.workouts.push(action.payload);
    },
    updateWorkout: (state, action) => {
      const index = state.workouts.findIndex(workout => workout._id === action.payload._id);
      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
    },
    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(workout => workout._id !== action.payload);
    },
  },
});

export const { setWorkouts, addWorkout, updateWorkout, deleteWorkout } = workoutSlice.actions;
export const selectWorkouts = (state) => state.workout.workouts;
export default workoutSlice.reducer;
