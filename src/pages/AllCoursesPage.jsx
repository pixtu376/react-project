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
    createMutation.mutate({ title: newTitle, body: 'Описание', userId: 1 });
    setNewTitle('');
  };

  const handleUpdate = (id) => {
    const current = courses.find(c => c.id === id);
    const title = prompt("Новое название курса:", current?.title);
    if (title) {
      // ПЕРЕДАЕМ ОБЪЕКТ (важно для v5)
      updateMutation.mutate({ ...current, title });
    }
  };

  if (isLoading) return <div className="loader">Загрузка данных...</div>;
  if (isError) return <div className="error">Ошибка сервера</div>;

  return (
    <div className="page container">
      <h2>Управление курсами</h2>
      
      <form onSubmit={handleAdd} className="filter-bar" style={{marginBottom: '20px'}}>
        <input 
          className="search-input"
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Название нового курса..."
        />
        <button type="submit" className="btn-add">Добавить</button>
      </form>

      <div className="courses-grid">
        {courses?.map(course => (
          <CourseCard 
            key={course.id} 
            {...course} 
            onUpdate={() => handleUpdate(course.id)} 
            onDelete={() => deleteMutation.mutate(course.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default AllCoursesPage;