import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Gemini_Generated_Image_3nue8b3nue8b3nue.png';

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link to="/" className="logo"><img src={logo} alt="GreenStudy Logo" style={{ width: '30px', height: '30px'}}/> GreenStudy</Link>
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