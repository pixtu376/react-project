import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [loginInput, setLogin] = useState('');
  const [passInput, setPass] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(loginInput, passInput)) {
      navigate('/dashboard');
    } else {
      setError('Неверный логин или пароль! (Подсказка: user / 123456)');
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h2>С возвращением!</h2>
        <p className="auth-subtitle">Войдите, чтобы продолжить обучение</p>
        
        {error && <div className="error-banner">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин</label>
            <input 
              type="text" 
              value={loginInput} 
              onChange={e => setLogin(e.target.value)}
              className={error ? 'input-error' : ''}
              placeholder="Введите user"
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              value={passInput} 
              onChange={e => setPass(e.target.value)}
              className={error ? 'input-error' : ''}
              placeholder="Введите 123456"
            />
          </div>
          <button type="submit" className="btn btn-primary full-width">Войти</button>
        </form>
        
        <div className="auth-footer">
          <p>Еще нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;