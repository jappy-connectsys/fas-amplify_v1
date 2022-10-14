import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from 'src/store/middleware/directus';

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/", formValue);
      //toast.success("Login Successfully");
      alert('Login Success')
      navigate("/dashboard");
      return response.data.data;
    } catch (err) {
      console.log('13', err);
      return rejectWithValue(error.response.request._response);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await  axiosInstance.post("/users/", formValue);
      //toast.success("Register Successfully");
      alert('Register Success')
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(error.response.request._response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  },
});


export default authSlice.reducer;
