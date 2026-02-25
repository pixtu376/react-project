import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link to="/" className="logo">🌿 GreenStudy</Link>
        <nav className="main-nav">
          <Link to="/">Главная</Link>
          <Link to="/courses">Все курсы</Link>
          <Link to="/info">О нас</Link>
          <Link 
            to={user ? "/dashboard" : "/login"} 
            className={`btn ${user ? 'btn-outline' : 'btn-primary'}`}
          >
            {user ? "👤 Кабинет" : "Войти"}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;