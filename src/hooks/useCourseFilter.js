import { useMemo } from 'react';

export const useCourseFilter = (courses, filterQuery) => {
  const filteredCourses = useMemo(() => {
    if (!filterQuery) return courses;
    const lowerQuery = filterQuery.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(lowerQuery) ||
      course.category.toLowerCase().includes(lowerQuery)
    );
  }, [courses, filterQuery]);

  return filteredCourses;
};