import React from 'react';

const CourseCard = ({ id, title, body, onUpdate, onDelete }) => (
  <div className="course-card">
    <div className="card-content">
      <h3>{title}</h3>
      <p>{body?.substring(0, 100)}...</p> 
      <div className="card-footer">
        <button className="btn-sm" onClick={() => onUpdate(id)}>Редактировать</button>
        <button className="btn-sm btn-danger" onClick={() => onDelete(id)}>Удалить</button>
      </div>
    </div>
  </div>
);

export default CourseCard;