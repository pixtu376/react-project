import React from 'react';

// Локальный компонент прогресса (оставлен без изменений)
const ProgressCard = ({ title, progress, lastLesson }) => (
  <div className="progress-card">
    <div className="pc-header">
      <h4>{title}</h4>
      <span className="pc-percent">{progress}%</span>
    </div>
    <div className="progress-bar-bg">
      <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
    <p className="pc-last">Остановились на: {lastLesson}</p>
    <button className="btn-sm btn-outline">Продолжить</button>
  </div>
);

const DashboardMyCourses = () => (
  <div className="dashboard-panel">
    <h2>Мои курсы</h2>
    <div className="tabs">
      <button className="active">Активные</button>
      <button>Завершенные</button>
    </div>

    <div className="my-courses-list">
      <ProgressCard 
        title="React для начинающих: С нуля до Pro" 
        progress={45} 
        lastLesson="Урок 12. UseEffect Deep Dive" 
      />
      <ProgressCard 
        title="Английский для IT специалистов" 
        progress={78} 
        lastLesson="Unit 5. Job Interview" 
      />
      
      <div className="recommendation-block">
        <h3>Вам может понравиться</h3>
        <p>На основе ваших интересов мы подобрали "Node.js: Серверный JavaScript"</p>
      </div>
    </div>
  </div>
);

export default DashboardMyCourses;