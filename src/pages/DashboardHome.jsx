import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../store/hooks';
import { fetchUserProfile } from '../api';

const DashboardHome = () => {
  const { user } = useAppSelector(state => state.auth);

  // Зависимый запрос: начнётся только если user.id существует
  const { data: profile, isLoading } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: () => fetchUserProfile(user.id),
    enabled: !!user?.id, 
    refetchInterval: 60000, // Авто-обновление раз в минуту
  });

  return (
    <div className="dashboard-panel">
      <h1>Привет, {profile?.name || user?.name || 'пользователь'}! 👋</h1>
      {isLoading && <span>Обновление профиля...</span>}
      
      <div className="stats-widgets">
        <div className="widget"><h3>2</h3><p>Курса в процессе</p></div>
        <div className="widget"><h3>14</h3><p>Часов изучено</p></div>
      </div>

      <div className="recent-activity">
        <h3>Данные из профиля (API):</h3>
        <p>Email: {profile?.email || '—'}</p>
        <p>Компания: {profile?.company?.name || '—'}</p>
      </div>
    </div>
  );
};

export default DashboardHome;