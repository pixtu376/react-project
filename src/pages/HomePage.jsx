import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="page home-page">
    <section className="hero-section">
      <div className="container hero-content">
        <h1>Инвестируйте в свои знания с GreenStudy</h1>
        <p>Платформа, где обучение приносит спокойствие и результат. Более 100 курсов от ведущих экспертов отрасли.</p>
        <div className="hero-buttons">
          <Link to="/courses" className="btn btn-primary">Начать обучение</Link>
          <Link to="/info" className="btn btn-outline-white">Узнать больше</Link>
        </div>
      </div>
    </section>

    <section className="features-section container">
      <h2>Почему выбирают нас?</h2>
      <div className="features-grid">
        <div className="feature-box">
          <div className="icon">🌱</div>
          <h3>Экологичный подход</h3>
          <p>Никакого стресса и дедлайнов. Учитесь в своем ритме.</p>
        </div>
        <div className="feature-box">
          <div className="icon">👩‍🏫</div>
          <h3>Эксперты-практики</h3>
          <p>Преподаватели из ведущих IT-компаний мира.</p>
        </div>
        <div className="feature-box">
          <div className="icon">📜</div>
          <h3>Официальный диплом</h3>
          <p>Сертификат, который ценится работодателями.</p>
        </div>
      </div>
    </section>

    <section className="cta-section">
      <div className="container">
        <h2>Готовы изменить свою карьеру?</h2>
        <Link to="/register" className="btn btn-primary">Присоединиться бесплатно</Link>
      </div>
    </section>
  </div>
);

export default HomePage;