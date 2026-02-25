import React, { useState, useEffect } from 'react';
import { api } from '../api';
import CourseCard from '../components/CourseCard';

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Состояние для формы создания/редактирования
  const [newCourseTitle, setNewCourseTitle] = useState('');

  // 1. GET - Получение данных
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.getCourses();
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  // 2. POST - Создание
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createCourse({
        title: newCourseTitle,
        body: 'Новое описание курса',
        userId: 1
      });
      // Имитируем добавление в список (т.к. API фейковый)
      setCourses([response.data, ...courses]);
      setNewCourseTitle('');
    } catch (err) {
      alert('Не удалось добавить курс');
    }
  };

  // 3. DELETE - Удаление
  const handleDelete = async (id) => {
    try {
      await api.deleteCourse(id);
      setCourses(courses.filter(course => course.id !== id));
    } catch (err) {
      alert('Ошибка при удалении');
    }
  };

  // 4. PUT - Обновление
  const handleUpdate = async (id) => {
    const updatedTitle = prompt("Введите новое название курса:");
    if (!updatedTitle) return;

    try {
      const response = await api.updateCourse(id, {
        title: updatedTitle,
        body: 'Обновленное описание',
        userId: 1
      });
      setCourses(courses.map(c => c.id === id ? { ...c, title: response.data.title } : c));
    } catch (err) {
      alert('Ошибка при обновлении');
    }
  };

  return (
    <div className="page container">
      <div className="courses-header">
        <h2>Управление курсами (API)</h2>
        
        {/* Форма добавления (POST) */}
        <form onSubmit={handleAddCourse} className="filter-bar">
          <input 
            type="text" 
            placeholder="Название нового курса..." 
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
            className="search-input"
            required
          />
          <button type="submit" className="btn-add">Добавить курс</button>
        </form>
      </div>

      {/* Индикатор загрузки */}
      {loading && <div className="loader">Загрузка курсов...</div>}

      {/* Обработка ошибок */}
      {error && <div className="error-message">{error}</div>}

      <div className="courses-grid">
        {!loading && courses.map(course => (
          <CourseCard 
            key={course.id} 
            {...course} 
            onDelete={handleDelete} 
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCoursesPage;