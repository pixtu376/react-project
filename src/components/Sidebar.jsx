import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <aside className="sidebar">
      <div className="user-profile-mini">
        <img src={user?.avatar} alt="avatar" className="avatar-img" />
        <div className="user-info">
          <strong>{user?.name}</strong>
          <span>Студент</span>
        </div>
      </div>
      <nav className="sidebar-menu">
        <Link to="/dashboard" className={isActive('/dashboard')}>📊 Обзор</Link>
        <Link to="/dashboard/my-courses" className={isActive('/dashboard/my-courses')}>🎓 Мои курсы</Link>
        <Link to="/dashboard/settings" className={isActive('/dashboard/settings')}>⚙️ Настройки</Link>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn-logout">Выйти</button>
      </div>
    </aside>
  );
};

export default Sidebar;