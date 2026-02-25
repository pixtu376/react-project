import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardSettings = () => {
  const { user } = useAuth();
  
  return (
    <div className="dashboard-panel">
      <h2>Настройки профиля</h2>
      
      <div className="settings-section">
        <h3>Личная информация</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Имя</label>
            <input type="text" defaultValue={user.name} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={user.email} disabled />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Безопасность</h3>
        <div className="form-group">
          <label>Текущий пароль</label>
          <input type="password" />
        </div>
        <div className="form-group">
          <label>Новый пароль</label>
          <input type="password" />
        </div>
      </div>

      <div className="settings-section">
        <h3>Уведомления</h3>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked /> Получать дайджест новостей
        </label>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked /> Уведомления о новых уроках
        </label>
      </div>

      <div className="settings-actions">
        <button className="btn btn-primary">Сохранить изменения</button>
        <button className="btn btn-text">Отмена</button>
      </div>
    </div>
  );
};

export default DashboardSettings;