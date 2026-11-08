import axios from 'axios';

function getBackendUrl() {
  let url = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');

  // If empty, fall back based on build mode
  if (!url) {
    url = import.meta.env.PROD
      ? 'https://student-backend-vzzi.onrender.com'
      : 'http://localhost:8080';
  }

  // Ensure protocol is present
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  // Prevent truncated Render hostnames (missing .onrender.com)
  if (url.includes('student-backend') && !url.includes('.onrender.com') && !url.includes('localhost')) {
    url = `${url}.onrender.com`;
  }

  return url;
}

export const BACKEND_URL = getBackendUrl();
export const HEALTH_URL = `${BACKEND_URL}/health`;
export const API_BASE_URL = `${BACKEND_URL}/hernandez/students`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentApi = {
  // Health check endpoint
  checkHealth: async () => {
    const response = await axios.get(HEALTH_URL);
    return response.data;
  },

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
