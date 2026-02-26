import axios from 'axios';

const BASE_URL = 'https://699f5a1d3188b0b1d535e442.mockapi.io/courses';

export const fetchCourses = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};

export const createCourse = async (newCourse) => {
  const { data } = await axios.post(BASE_URL, newCourse);
  return data;
};

export const updateCourse = async (payload) => {
  const { id, ...updates } = payload;
  // Логируем для отладки
  console.log("Обновление курса с ID:", id); 
  const { data } = await axios.put(`${BASE_URL}/${id}`, updates);
  return data;
};

export const deleteCourse = async (id) => {
  console.log("Удаление курса с ID:", id);
  // Если здесь придет undefined или null, будет 404
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return id;
};

export const fetchUserProfile = async (userId) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId || 1}`);
  return data;
};