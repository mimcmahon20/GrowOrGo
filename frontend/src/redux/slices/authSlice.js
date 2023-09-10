import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { verifyToken, registerUser, loginUser, getUser, updateUser, deleteUser } from '../../api/authAPI';

export const verifyTokenAsync = createAsyncThunk(
  'auth/veryifyTokenAsync',
  async (_, thunkAPI) => {
    try {
      const response = await verifyToken();
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);  // Updated line to handle undefined response property
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (userData, thunkAPI) => {
    try {
      const response = await registerUser(userData);
      const token = response.token;  // Updated line
      localStorage.setItem('token', token);
      return response;  // Updated line
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);  // Updated line to handle undefined response property
      console.log('caught error in registerAsync');
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);  // Updated line to handle undefined response property
    }
  }
);

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
      localStorage.removeItem('token');
      return thunkAPI.fulfillWithValue(null);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserAsync = createAsyncThunk(
  'auth/getUserAsync',
  async (_, thunkAPI) => {
    try {
      const response = await getUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updateAsync = createAsyncThunk(
  'auth/updateAsync',
  async (userData, thunkAPI) => {
    try {
      const response = await updateUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const deleteAsync = createAsyncThunk(
  'auth/deleteAsync',
  async (_, thunkAPI) => {
    try {
      const response = await deleteUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
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
      .addCase(registerAsync.pending, (state) => {
        console.log('register pending')
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        console.log('register fulfilled')
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        console.log('register rejected')
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserAsync.pending, (state) => {
        console.log('getUser pending')
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        console.log('getUser fulfilled')
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        console.log('getUser rejected')
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAsync.pending, (state) => {
        console.log('update pending')
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        console.log('update fulfilled')
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(updateAsync.rejected, (state, action) => {
        console.log('update rejected')
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAsync.pending, (state) => {
        console.log('delete pending')
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        console.log('delete fulfilled')
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(deleteAsync.rejected, (state, action) => {
        console.log('delete rejected')
        state.loading = false;
        state.error = action.payload;
      })
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
