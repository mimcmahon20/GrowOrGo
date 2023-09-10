import axios from 'axios';

const baseURL = 'http://localhost:5000/api/users';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
    }});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/me`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/delete`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};