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

export const getUserRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/Authentication/GetRoleCategory`);
    return response.data;
  }
  catch (error) {
    console.error('Error feacthing userroles:', error);
    throw error;
  }
}

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Authentication/AddUser`, user);
    return response.data;
  }
  catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const getUserList = async () =>{

  try {
    const response = await axios.get(`${API_BASE_URL}/api/Authentication/GetUserList`)
    return response ;
  }
  catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

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