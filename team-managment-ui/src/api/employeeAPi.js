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

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/Employee`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving employees:', error);
    throw error;
  }
};

export const getEmployeeDetails = async (employeeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/Employee/getEmployee?employeeId=${employeeId}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving employee details:', error);
    throw error;
  }
};

export const updateEmployee = async ( updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/Employee`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const getEmployeeNoUser = async ()=>{

  try {
    
    const response = await axios.get(`${API_BASE_URL}/api/Employee/getEmployeeNoUser`);

    return response
  }
  catch (error) {
    console.error('Error getting employee:', error);
    throw error;
  }
}