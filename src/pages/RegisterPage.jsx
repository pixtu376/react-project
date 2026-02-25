import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => (
  <div className="page auth-page">
    <div className="auth-card">
      <h2>Создание аккаунта</h2>
      <p className="auth-subtitle">Присоединяйтесь к сообществу GreenStudy</p>
      
      <form>
        <div className="form-group">
          <label>Имя и Фамилия</label>
          <input type="text" placeholder="Иван Иванов" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="example@mail.com" />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input type="password" placeholder="Придумайте пароль" />
        </div>
        <div className="form-group">
          <label>Повторите пароль</label>
          <input type="password" placeholder="Повторите пароль" />
        </div>
        <button type="button" className="btn btn-primary full-width">Зарегистрироваться</button>
      </form>
      
      <div className="auth-footer">
        <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </div>
    </div>
  </div>
);

export default RegisterPage;