import axios from 'axios';

const baseURL = 'http://localhost:5000/api/workouts';

export const createWorkout = async (workoutData) => {
  try {
    const response = await axios.post(baseURL, workoutData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getWorkouts = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateWorkout = async (workoutId, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}/${workoutId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const response = await axios.delete(`${baseURL}/${workoutId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
