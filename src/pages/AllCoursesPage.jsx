import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CourseCard from '../components/CourseCard';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../api'; // твои API-функции

const AllCoursesPage = () => {
  const [newTitle, setNewTitle] = useState('');
  const queryClient = useQueryClient();

  // useQuery вместо Redux + useEffect
  const { 
    data: courses = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 5,      // 5 минут данные свежие
    gcTime: 1000 * 60 * 30,        // кэш 30 минут
    retry: 2,
  });

  // Мутация на создание
  const createMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: (newCourse) => {
      // Оптимистично добавляем в кэш
      queryClient.setQueryData(['courses'], (old = []) => [...old, newCourse]);
      // или invalidateQueries, если хочешь перезагрузить с сервера
      // queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
    onError: (err) => {
      alert(`Ошибка добавления: ${err.message || 'Неизвестная ошибка'}`);
    },
  });

  // Мутация на обновление (с оптимистичным обновлением)
  const updateMutation = useMutation({
    mutationFn: updateCourse,
    onMutate: async (updatedCourse) => {
      await queryClient.cancelQueries({ queryKey: ['courses'] });
      const previous = queryClient.getQueryData(['courses']);
      queryClient.setQueryData(['courses'], (old = []) =>
        old.map(c => c.id === updatedCourse.id ? { ...c, ...updatedCourse } : c)
      );
      return { previous };
    },
    onError: (err, updatedCourse, context) => {
      queryClient.setQueryData(['courses'], context.previous);
      alert(`Ошибка обновления: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  // Мутация на удаление (оптимистичное)
  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['courses'] });
      const previous = queryClient.getQueryData(['courses']);
      queryClient.setQueryData(['courses'], (old = []) => old.filter(c => c.id !== id));
      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['courses'], context.previous);
      alert(`Ошибка удаления: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createMutation.mutate({ 
      title: newTitle, 
      body: 'Новый курс по методике GreenStudy. Описание скоро появится.', 
    });
    setNewTitle('');
  };

  const handleUpdate = (id) => {
    const current = courses.find(c => c.id === id);
    const title = prompt("Новое название курса:", current?.title);
    if (title && title.trim() !== current?.title) {
      updateMutation.mutate({ ...current, title });
    }
  };

  if (isLoading) return <div className="loader">Загрузка спокойствия...</div>;
  if (isError) return <div className="error">Ошибка сервера: {error?.message || 'Проверьте URL в api/index.js'}</div>;

  return (
    <div className="page container">
      <header style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#2e7d32' }}>Управление курсами</h2>
      </header>
      
      <form 
        onSubmit={handleAdd} 
        className="filter-bar" 
        style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}
      >
        <input 
          className="search-input"
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Название нового курса..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          disabled={createMutation.isPending}
        />
        <button 
          type="submit" 
          className="btn-add"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Добавление...' : 'Добавить'}
        </button>
      </form>

      <div 
        className="courses-grid" 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}
      >
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.slice(0, 6).map(course => (
            <CourseCard 
              key={course.id} 
              {...course} 
              onUpdate={() => handleUpdate(course.id)} 
              onDelete={() => deleteMutation.mutate(course.id)} 
            />
          ))
        ) : (
          <p>Курсов пока нет.</p>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;