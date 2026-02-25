import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchCourses = async () => {
  const { data } = await axios.get(`${API_URL}?_limit=6`);
  return data;
};

export const createCourse = async (newCourse) => {
  const { data } = await axios.post(API_URL, newCourse);
  return data;
};

export const updateCourse = async (payload) => {
  const { id, ...updates } = payload;
  const { data } = await axios.put(`${API_URL}/${id}`, updates);
  return data;
};

export const deleteCourse = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

export const fetchUserProfile = async (userId) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId || 1}`);
  return data;
};