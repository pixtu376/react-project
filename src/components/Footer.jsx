import React from 'react';

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-cols">
        <div>
          <h4>GreenStudy</h4>
          <p>Экологичное образование для вашего будущего.</p>
        </div>
        <div>
          <h4>Разделы</h4>
          <ul>
            <li>Каталог</li>
            <li>Блог</li>
            <li>Вебинары</li>
          </ul>
        </div>
        <div>
          <h4>Контакты</h4>
          <p>support@greenstudy.com</p>
          <p>+7 (999) 000-00-00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 GreenStudy Inc. Все права защищены.</p>
      </div>
    </div>
  </footer>
);

export default Footer;