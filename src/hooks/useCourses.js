import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api';

// Хук для получения курсов
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: api.fetchCourses,
    staleTime: 1000 * 60 * 5, // Данные "свежие" 5 минут
  });
};

// Хук для создания курса
export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createCourse,
    onSuccess: (newCourse) => {
      queryClient.setQueryData(['courses'], (old) => [newCourse, ...old]);
    },
  });
};

// Хук для УДАЛЕНИЯ (Оптимистичный)
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteCourse,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['courses'] });
      const previous = queryClient.getQueryData(['courses']);
      queryClient.setQueryData(['courses'], (old) => old?.filter(c => c.id !== id));
      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['courses'], context.previous);
    },
    //onSettled: () => queryClient.invalidateQueries({ queryKey: ['courses'] })
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.updateCourse,
    onMutate: async (updatedCourse) => {
      await queryClient.cancelQueries({ queryKey: ['courses'] });
      const previous = queryClient.getQueryData(['courses']);
      
      queryClient.setQueryData(['courses'], (old) =>
        old?.map(c => c.id === updatedCourse.id ? { ...c, ...updatedCourse } : c)
      );
      
      return { previous };
    },
    onError: (err, updatedCourse, context) => {
      queryClient.setQueryData(['courses'], context.previous);
    },
    //onSettled: () => queryClient.invalidateQueries({ queryKey: ['courses'] })
  });
};

export const useUserProfile = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.fetchUserProfile(userId),
    // Запрос не начнется, пока userId не станет "правдивым" (enabled опция)
    enabled: !!userId, 
  });
};