import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Для будущих API, если добавите реальный auth

// Симуляция async login (как в вашем AuthContext, но с Promise для thunk)
const fakeLogin = (username, password) => new Promise((resolve, reject) => {
  setTimeout(() => { // Симуляция задержки
    if (username === 'user' && password === '123456') {
      resolve({
        name: 'Иван Иванов',
        email: 'ivan@greenstudy.com',
        avatar: 'https://placehold.co/100x100/4CAF50/FFF?text=IV',
      });
    } else {
      reject('Неверные учетные данные');
    }
  }, 500);
});

// Аналогично для register (симуляция)
const fakeRegister = (username, password, email) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (username && password && email) {
      resolve({
        name: username,
        email,
        avatar: 'https://placehold.co/100x100/4CAF50/FFF?text=NEW',
      });
    } else {
      reject('Некорректные данные');
    }
  }, 500);
});

// Thunks (см. шаг 5)
export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const user = await fakeLogin(username, password);
    return user;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const register = createAsyncThunk('auth/register', async ({ username, password, email }, { rejectWithValue }) => {
  try {
    const user = await fakeRegister(username, password, email);
    return user;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId || 1}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    reset: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Аналогично для register и fetchUserProfile
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.isAuthenticated = true; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchUserProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchUserProfile.fulfilled, (state, action) => { state.loading = false; state.user = { ...state.user, ...action.payload }; })
      .addCase(fetchUserProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout, setError, clearError, setLoading, reset, updateUser } = authSlice.actions;
export default authSlice.reducer;