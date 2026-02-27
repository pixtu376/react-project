import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk 1: Загрузка данных с API (пример с JSONPlaceholder)
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
});

// Thunk 2: Отправка данных (симуляция POST)
export const postData = createAsyncThunk('data/postData', async (newItem) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: { 'Content-type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to post');
  return response.json();
});

// Thunk 3: Удаление (симуляция DELETE)
export const deleteData = createAsyncThunk('data/deleteData', async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete');
  return id; // Возвращаем id для удаления из state
});