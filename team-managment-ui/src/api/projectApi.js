import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  export const getProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Project`);
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      console.error('Error retrieving team:', error);
      throw error;
    }
  };

  export const getProjectEmployee = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Employee/getEmployeesSelectList`);
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      console.error('Error retrieving team:', error);
      throw error;
    }
  };
  export const getProjectTeam = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Team/GetTeamSelectList`);
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      console.error('Error retrieving team:', error);
      throw error;
    }
  };

  export const createProject = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Project`, data);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  export const updateProject = async ( updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/Project`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };