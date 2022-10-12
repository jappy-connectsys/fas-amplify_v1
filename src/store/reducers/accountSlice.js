import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getAccounts = createAsyncThunk(
  'account/getAccounts', 
  async () => {
  try {
      const response = await api.get(`/users/`)
      console.log(response.data.data);
      return response.data.data;
  } catch (err) {
    if (!err.response) {
      throw err
    }
    console.error(err.response.data);
    console.error(err.response.status);
    console.error(err.response.headers);
    return err.response.data;
  }
});

export const getProfiles = createAsyncThunk(
  'account/getProfile', 
  async () => {
  try {
      const response = await api.get(`/items/user_profile`)
      return response.data.data;
  } catch (err) {
    if (!err.response) {
      throw err
    }
    console.error(err.response.data);
    console.error(err.response.status);
    console.error(err.response.headers);
    return err.response.data;
  }
});

export const createAccount = createAsyncThunk(
  'account/createAccount', 
  async (initialPost) => {
  try {
      const response = await api.post(`/users/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updateAccount = createAsyncThunk(
  'account/updateAccount', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.patch(`/users/${id}`, initialPost)
      console.log('updated: ' + response.data.data);      
      if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
        //return response.data.data;
  } catch (err) {
      console.error("Error response:");
      console.error(err.response.data); 
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
      //return initialPost; // only for testing Redux!
  }
});

export const updateProfile = createAsyncThunk(
  'account/updateProfile', 
  async (initialPost) => {
  const { userid } = initialPost;
  try {
      const response = await api.patch(`/items/user_profile/${userid}`, initialPost)
      console.log('updated: ' + response.data.data);      
      if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
        //return response.data.data;
  } catch (err) {
      console.error("Error response:");
      console.error(err.response.data); 
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
      //return initialPost; // only for testing Redux!
  }
});

export const deleteAccount = createAsyncThunk(
  'account/deleteAccount', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/users/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});

//Initial State
const initialState = {
  data: [],
  profile: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getAccounts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAccounts.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
    });
    builder.addCase(getAccounts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });
    builder.addCase(getProfiles.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getProfiles.fulfilled, (state, action) => {
        state.status = 'success';
        state.profile = action.payload;
    });
    builder.addCase(getProfiles.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createAccount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updateAccount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateAccount.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const accounts = state.data.filter(post => post.id !== id);
        state.data = [...accounts, action.payload];
    });
    builder.addCase(updateAccount.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.userid) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const profiles = state.data.filter(post => post.userid !== id);
        state.profile = [...profiles, action.payload];
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deleteAccount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const accounts = state.posts.filter(post => post.id !== id);
      state.data = accounts;
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectAccounts = (state) => state.account;
export const selectAccountId = (state, id) => state.account.data.find((post) => post.id === id);
export const selectAccountProfile = (state, id) => state.account.profile.find((post) => post.id === id);

export default accountSlice.reducer;