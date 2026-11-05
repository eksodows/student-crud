import axios from 'axios';

const api = axios.create({
  baseURL: '/hernandez/students',
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
