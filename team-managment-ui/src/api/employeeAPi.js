import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;



export const createEmployee = async (data) => {
  try {

    console.log(data)
    
    const response = await axios.post(`${API_BASE_URL}/api/Employee`, data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};