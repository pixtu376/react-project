import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../../api.js';
import { createSelector } from '@reduxjs/toolkit';

export const getCourses = createAsyncThunk('courses/getCourses', async (_, { rejectWithValue }) => {
  try {
    return await fetchCourses();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addCourse = createAsyncThunk('courses/addCourse', async (newCourse, { rejectWithValue }) => {
  try {
    return await createCourse(newCourse);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const editCourse = createAsyncThunk('courses/editCourse', async (payload, { rejectWithValue }) => {
  try {
    return await updateCourse(payload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const removeCourse = createAsyncThunk('courses/removeCourse', async (id, { rejectWithValue }) => {
  try {
    await deleteCourse(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCourses: (state) => {
      state.courses = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addLocalCourse: (state, action) => { // Для оптимистичных обновлений, если нужно
      state.courses.push(action.payload);
    },
    removeLocalCourse: (state, action) => {
      state.courses = state.courses.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getCourses.fulfilled, (state, action) => { state.loading = false; state.courses = action.payload; })
      .addCase(getCourses.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addCourse.pending, (state) => { state.loading = true; })
      .addCase(addCourse.fulfilled, (state, action) => { state.loading = false; state.courses.push(action.payload); })
      .addCase(addCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(editCourse.pending, (state) => { state.loading = true; })
      .addCase(editCourse.fulfilled, (state, action) => { 
        state.loading = false; 
        const index = state.courses.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.courses[index] = action.payload;
      })
      .addCase(editCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(removeCourse.pending, (state) => { state.loading = true; })
      .addCase(removeCourse.fulfilled, (state, action) => { 
        state.loading = false; 
        state.courses = state.courses.filter(c => c.id !== action.payload); 
      })
      .addCase(removeCourse.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const selectCourses = (state) => state.courses.courses;
export const selectTotalCourses = createSelector(
  selectCourses,
  (courses) => courses.length
);
export const selectFilteredCourses = createSelector(
  selectCourses,
  (courses) => courses.filter(c => c.title.includes('GreenStudy')) // Пример вычисляемого
);

export const { resetCourses, setLoading, clearError, addLocalCourse, removeLocalCourse } = coursesSlice.actions;
export default coursesSlice.reducer;