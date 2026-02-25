import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { fetchUserProfile } from '../api';

const DashboardHome = () => {
  const { user } = useAuth();

  // Зависимый запрос: начнется только если user.id существует (ТЗ п. 7)
  const { data: profile, isLoading } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: () => fetchUserProfile(user.id),
    enabled: !!user?.id, 
    refetchInterval: 60000, // Авто-обновление раз в минуту
  });

  return (
    <div className="dashboard-panel">
      <h1>Привет, {profile?.name || user.name}! 👋</h1>
      {isLoading && <span>Обновление профиля...</span>}
      
      <div className="stats-widgets">
        <div className="widget"><h3>2</h3><p>Курса в процессе</p></div>
        <div className="widget"><h3>14</h3><p>Часов изучено</p></div>
      </div>

      <div className="recent-activity">
        <h3>Данные из профиля (API):</h3>
        <p>Email: {profile?.email}</p>
        <p>Компания: {profile?.company?.name}</p>
      </div>
    </div>
  );
};

export default DashboardHome;