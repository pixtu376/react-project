import React from 'react';

const CourseCard = ({ title, category, price, image, level, duration }) => (
  <div className="course-card">
    <div className="card-image">
      <img src={image} alt={title} />
      <span className="category-badge">{category}</span>
    </div>
    <div className="card-content">
      <h3>{title}</h3>
      <div className="card-meta">
        <span>📶 {level}</span>
        <span>🕒 {duration}</span>
      </div>
      <div className="card-footer">
        <span className="price">{price}</span>
        <button className="btn-sm">Подробнее</button>
      </div>
    </div>
  </div>
);

export default CourseCard;