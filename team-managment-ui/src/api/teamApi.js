import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  export const createTeam = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Team`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  };

  export const getTeams = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Team`);
      return response.data;
    } catch (error) {
      console.error('Error retrieving team:', error);
      throw error;
    }
  };

  export const getSelectedEmployee= async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Employee/getEmployeesSelectList`);
      return response.data;
    } catch (error) {
      console.error('Error retrieving selected Employee:', error);
      throw error;
    }
  }
  export const getEmployeeNotInTeam = async (teamId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Team/GetEmployeeNotInTeam?teamId=${teamId}`);
      return response.data; 
    } catch (error) {
      console.error('Error retrieving employees not in team:', error);
      throw error;
    }
  };
  
  export const getTeamMembersSelectList = async (teamId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Team/GetTeamMembersSelectList?teamId=${teamId}`);
      return response.data; 
    } catch (error) {
      console.error('Error retrieving selected Employee:', error);
      throw error;
    }
  };
  export const addTeamMember = async (teamMembers) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Team/AddTeamMember`, teamMembers);
      return response.data;
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  };
  
  export const removeTeamMember = async (employeess) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Team/RemoveTeamMember`, employeess);
      return response.data;
    } catch (error) {
      console.error('Error removing team member:', error);
      throw error;
    }
  };

  export const getProject = async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Project/GetProjectSelectList`);
      return response.data;
    } catch (error) {
      console.error('Error retrieving selected Employee:', error);
      throw error;
    }
  }
  export const updateTeam = async ( updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/Team`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  };