import axios from 'axios';

const API_BASE_URL = 'http://api.example.com'; // Replace with your API URL

export const getStudents = async () => {
  const response = await axios.get(`${API_BASE_URL}/students`);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await axios.post(`${API_BASE_URL}/students`, studentData);
  return response.data;
};

// Implement updateStudent and deleteStudent similarly
