import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';  // Importing axios to make API requests

// Async thunk to fetch workouts for a user
export const getWorkoutsAsync = createAsyncThunk(
  'workout/getWorkoutsAsync',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/workouts/${userId}`);
      return response.data;  // Returning the data directly
    } catch (error) {
      console.log('Error fetching workouts:', error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Creating the workout slice
export const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    workouts: [],
    status: 'idle',
    error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutsAsync.pending, (state) => {
        console.log('Fetching workouts...');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getWorkoutsAsync.fulfilled, (state, action) => {
        console.log('Successfully fetched workouts');
        state.status = 'succeeded';
        state.workouts = action.payload;
      })
      .addCase(getWorkoutsAsync.rejected, (state, action) => {
        console.log('Failed to fetch workouts', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Exporting the actions and a selector
export const { setWorkouts, addWorkout, updateWorkout, deleteWorkout } = workoutSlice.actions;
export const selectWorkouts = (state) => state.workout.workouts;
export default workoutSlice.reducer;
