import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;



export const login = async (username, password) => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/api/Authentication/Login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Other API functions...