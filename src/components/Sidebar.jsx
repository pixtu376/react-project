import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

const Sidebar = () => {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  // Если пользователь не авторизован — можно ничего не показывать или показать гостевой вид
  // Но в твоём оригинале предполагается, что Sidebar рендерится только для авторизованных
  if (!isAuthenticated) {
    return null; // или можно вернуть минимальный гостевой сайдбар, если нужно
  }

  return (
    <aside className="sidebar">
      <div className="user-profile-mini">
        <img src={user?.avatar} alt="avatar" className="avatar-img" />
        <div className="user-info">
          <strong>{user?.name || 'Гость'}</strong>
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