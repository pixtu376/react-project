import React, { useState } from 'react';
import { useCourseFilter } from '../hooks/useCourseFilter';
import { COURSES_DATA } from '../data/mockData';
import CourseCard from '../components/CourseCard';

const AllCoursesPage = () => {
  const [search, setSearch] = useState('');
  const filteredCourses = useCourseFilter(COURSES_DATA, search);

  return (
    <div className="page container">
      <div className="courses-header">
        <h2>Каталог курсов</h2>
        <p>Выберите направление и начните путь к новой профессии</p>
      </div>
      
      <div className="filter-bar">
        <input 
          type="text" 
          placeholder="🔍 Поиск курса (например: Python, Design)..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="filter-tags">
          <button onClick={() => setSearch('')}>Все</button>
          <button onClick={() => setSearch('Frontend')}>Frontend</button>
          <button onClick={() => setSearch('Backend')}>Backend</button>
          <button onClick={() => setSearch('Design')}>Design</button>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))
        ) : (
          <div className="no-results">
            <h3>По вашему запросу ничего не найдено 😔</h3>
            <p>Попробуйте изменить поисковый запрос.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;