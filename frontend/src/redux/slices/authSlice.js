import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from '../../api/authAPI';


export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (userData, thunkAPI) => {
    try {
      const response = await loginUser(userData);
      const token = response.token;  // Updated line
      localStorage.setItem('token', token);
      return response;  // Updated line
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);  // Updated line to handle undefined response property
      console.log('caught error in loginAsync');
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);  // Updated line to handle undefined response property
    }
  }
);


export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, thunkAPI) => {
    try {
      // Here you can also make an API call to a logout endpoint if you have one
      // For now, we'll just remove the token from local storage
      localStorage.removeItem('token');

      return thunkAPI.fulfillWithValue(null);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);






export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        console.log('login pending')
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log('login fulfilled')
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log('login rejected')
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        console.log('logout pending')
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        console.log('logout fulfilled')
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        console.log('logout rejected')
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
