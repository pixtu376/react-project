import React from 'react';

const CourseCard = ({ title, body, onUpdate, onDelete }) => (
  <div className="course-card" style={{ 
    border: '1px solid #e0e0e0', 
    borderRadius: '12px', 
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
  }}>
    <div className="card-content" style={{ padding: '20px' }}>
      <h3 style={{ color: '#1b5e20', marginTop: 0 }}>{title}</h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        {body ? `${body.substring(0, 80)}...` : "Нет описания"}
      </p> 
      <div className="card-footer" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button className="btn-sm" onClick={onUpdate}>Редактировать</button>
        <button className="btn-sm btn-danger" onClick={onDelete}>Удалить</button>
      </div>
    </div>
  </div>
);

export default CourseCard;