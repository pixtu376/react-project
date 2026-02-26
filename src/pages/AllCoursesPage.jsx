import React, { useState } from 'react';
import { useCourses, useCreateCourse, useDeleteCourse, useUpdateCourse } from '../hooks/useCourses';
import CourseCard from '../components/CourseCard';

const AllCoursesPage = () => {
  const [newTitle, setNewTitle] = useState('');
  const { data: courses, isLoading, isError } = useCourses();
  
  const createMutation = useCreateCourse();
  const deleteMutation = useDeleteCourse();
  const updateMutation = useUpdateCourse();

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
    if (title) {
      updateMutation.mutate({ ...current, title });
    }
  };

  if (isLoading) return <div className="loader">Загрузка спокойствия...</div>;
  if (isError) return <div className="error">Ошибка сервера. Проверьте URL в api/index.js</div>;

  return (
    <div className="page container">
      <header style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#2e7d32' }}>Управление курсами</h2>
      </header>
      
      <form onSubmit={handleAdd} className="filter-bar" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          className="search-input"
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Название нового курса..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
        />
        <button type="submit" className="btn-add">Добавить</button>
      </form>

      <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {Array.isArray(courses) ? (
          courses.slice(0, 6).map(course => ( // Показываем только первые 6
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