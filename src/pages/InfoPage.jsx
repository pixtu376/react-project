import React from 'react';

const InfoPage = () => (
  <div className="page container info-page">
    <div className="info-header">
      <h1>О платформе GreenStudy</h1>
      <p className="lead">Мы создаем образовательную среду, свободную от стресса.</p>
    </div>

    <div className="info-content">
      <section className="mission-block">
        <h2>Наша Миссия</h2>
        <p>
          В современном мире обучение часто ассоциируется с гонкой. Мы в GreenStudy верим, 
          что глубокие знания приходят только в состоянии покоя и концентрации. 
          Наша цель — дать вам инструменты для роста без выгорания.
        </p>
      </section>

      <section className="stats-block">
        <div className="stat">
          <span className="number">50k+</span>
          <span className="label">Студентов</span>
        </div>
        <div className="stat">
          <span className="number">120+</span>
          <span className="label">Курсов</span>
        </div>
        <div className="stat">
          <span className="number">4.9</span>
          <span className="label">Рейтинг</span>
        </div>
      </section>

      <section className="faq-block">
        <h2>Часто задаваемые вопросы</h2>
        <details>
          <summary>Как проходит обучение?</summary>
          <p>Вы смотрите видеолекции, выполняете домашние задания и получаете фидбек от кураторов.</p>
        </details>
        <details>
          <summary>Есть ли возврат средств?</summary>
          <p>Да, в течение 14 дней вы можете вернуть полную стоимость курса.</p>
        </details>
        <details>
          <summary>Нужно ли знать программирование заранее?</summary>
          <p>Нет, у нас много курсов для полных новичков.</p>
        </details>
      </section>
    </div>
  </div>
);

export default InfoPage;