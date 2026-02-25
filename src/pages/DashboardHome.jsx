import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-panel">
      <h1>Привет, {user.name}! 👋</h1>
      <p>Вот сводка вашей активности за последнюю неделю.</p>

      <div className="stats-widgets">
        <div className="widget">
          <h3>2</h3>
          <p>Курса в процессе</p>
        </div>
        <div className="widget">
          <h3>14</h3>
          <p>Часов изучено</p>
        </div>
        <div className="widget">
          <h3>85%</h3>
          <p>Средний результат тестов</p>
        </div>
        <div className="widget success">
          <h3>1</h3>
          <p>Сертификат получен</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Последняя активность</h3>
        <ul className="activity-list">
          <li>
            <span className="time">Сегодня, 10:00</span>
            <p>Просмотрен урок "Введение в React Hooks"</p>
          </li>
          <li>
            <span className="time">Вчера, 18:30</span>
            <p>Сдано домашнее задание по CSS Grid</p>
          </li>
          <li>
            <span className="time">12.10.2023</span>
            <p>Приобретен курс "Python для Data Science"</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;