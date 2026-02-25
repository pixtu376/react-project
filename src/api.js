import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const api = {
  getCourses: () => axios.get(`${API_URL}?_limit=6`),
  
  createCourse: (data) => axios.post(API_URL, data),
  
  updateCourse: (id, data) => axios.put(`${API_URL}/${id}`, data),
  
  deleteCourse: (id) => axios.delete(`${API_URL}/${id}`)
};