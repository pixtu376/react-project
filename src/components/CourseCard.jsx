import React from 'react';

const CourseCard = ({ title, body, onUpdate, onDelete }) => (
  <div className="course-card">
    <div className="card-content">
      <h3>{title}</h3>
      <p>{body?.substring(0, 80)}...</p> 
      <div className="card-footer">
        <button className="btn-sm" onClick={onUpdate}>Редактировать</button>
        <button className="btn-sm btn-danger" onClick={onDelete}>Удалить</button>
      </div>
    </div>
  </div>
);

export default CourseCard;