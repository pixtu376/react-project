import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login, clearError } from '../store/slices/authSlice'; // thunk и action

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  // Если уже авторизован — сразу редирект (защита от повторного входа)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError()); // сбрасываем предыдущую ошибку

    dispatch(login({ username, password }))
      .unwrap() // удобно для обработки fulfilled/rejected в промисе
      .then(() => {
        navigate('/dashboard'); // успех — редирект
      })
      .catch(() => {
        // ошибка уже в store, отобразим ниже
      });
  };

  return (
    <div className="login-page container">
      <h2>Вход в GreenStudy</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => dispatch(clearError())}>×</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </form>

      <p>
        Нет аккаунта? <a href="/register">Зарегистрироваться</a>
      </p>
    </div>
  );
};

export default LoginPage;