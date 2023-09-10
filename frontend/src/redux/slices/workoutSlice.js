import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} from "../../api/workoutAPI";

// Async Thunk to create a new workout
export const createWorkoutAsync = createAsyncThunk(
  "workout/createWorkoutAsync",
  async (workoutData, thunkAPI) => {
    try {
      const response = await createWorkout(workoutData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async Thunk to get workouts of a user
export const getWorkoutsAsync = createAsyncThunk(
  "workout/getWorkoutsAsync",
  async (userId, thunkAPI) => {
    try {
      const response = await getWorkouts(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async Thunk to update a workout
export const updateWorkoutAsync = createAsyncThunk(
  "workout/updateWorkoutAsync",
  async ({ workoutId, workoutData }, thunkAPI) => {
    try {
      const response = await updateWorkout(workoutId, workoutData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async Thunk to delete a workout
export const deleteWorkoutAsync = createAsyncThunk(
  "workout/deleteWorkoutAsync",
  async (workoutId, thunkAPI) => {
    try {
      const response = await deleteWorkout(workoutId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Creating the workout slice
export const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutsAsync.pending, (state) => {
        console.log("Fetching workouts...");
        state.status = "loading";
        state.error = null;
      })
      .addCase(getWorkoutsAsync.fulfilled, (state, action) => {
        console.log("Successfully fetched workouts");
        state.status = "succeeded";
        state.workouts = action.payload;
      })
      .addCase(getWorkoutsAsync.rejected, (state, action) => {
        console.log("Failed to fetch workouts", action.payload);
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createWorkoutAsync.pending, (state) => {
        console.log("Creating workout...");
        state.status = "loading";
        state.error = null;
      })
      .addCase(createWorkoutAsync.fulfilled, (state, action) => {
        console.log("Successfully created workout");
        state.status = "succeeded";
        state.workouts.push(action.payload);
      })
      .addCase(createWorkoutAsync.rejected, (state, action) => {
        console.log("Failed to create workout", action.payload);
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateWorkoutAsync.pending, (state) => {
        console.log("Updating workout...");
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateWorkoutAsync.fulfilled, (state, action) => {
        console.log("Successfully updated workout");
        state.status = "succeeded";
        const index = state.workouts.findIndex(
          (workout) => workout._id === action.payload._id
        );
        state.workouts[index] = action.payload;
      })
      .addCase(updateWorkoutAsync.rejected, (state, action) => {
        console.log("Failed to update workout", action.payload);
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteWorkoutAsync.pending, (state) => {
        console.log("Deleting workout...");
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteWorkoutAsync.fulfilled, (state, action) => {
        console.log("Successfully deleted workout");
        state.status = "succeeded";
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        );
      })
      .addCase(deleteWorkoutAsync.rejected, (state, action) => {
        console.log("Failed to delete workout", action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Exporting the actions and a selector
// export const { setWorkouts, addWorkout, updateWorkout, deleteWorkout } = workoutSlice.actions;
export const selectWorkouts = (state) => state.workout.workouts;
export default workoutSlice.reducer;
