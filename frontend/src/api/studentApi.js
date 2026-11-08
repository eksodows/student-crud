import axios from 'axios';

const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');

const DEFAULT_PROD_URL = 'https://student-backend-vzzi.onrender.com';
const DEFAULT_DEV_URL = 'http://localhost:8080';

export const BACKEND_URL = rawApiUrl
  ? (rawApiUrl.startsWith('http://') || rawApiUrl.startsWith('https://') ? rawApiUrl : `https://${rawApiUrl}`)
  : (import.meta.env.PROD ? DEFAULT_PROD_URL : DEFAULT_DEV_URL);

export const API_BASE_URL = `${BACKEND_URL}/hernandez/students`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentApi = {
  // Fetch all students
  getAll: async () => {
    const response = await api.get('');
    return response.data;
  },

  // Fetch a student by ID
  getById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Create a new student
  create: async (student) => {
    const response = await api.post('', {
      firstname: student.firstname.trim(),
      lastname: student.lastname.trim(),
      course: student.course.trim(),
      section: student.section.trim(),
    });
    return response.data;
  },

  // Update an existing student
  update: async (id, student) => {
    const response = await api.put(`/${id}`, {
      firstname: student.firstname.trim(),
      lastname: student.lastname.trim(),
      course: student.course.trim(),
      section: student.section.trim(),
    });
    return response.data;
  },

  // Delete a student
  delete: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};

export default studentApi;
