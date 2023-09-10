import axios from "axios";

const baseURL = "http://localhost:5000/api/workouts";

export const createWorkout = async (workoutData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseURL}`, workoutData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getWorkouts = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateWorkout = async (workoutId, workoutData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/${workoutId}`, workoutData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteWorkout = async (workoutId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/${workoutId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
