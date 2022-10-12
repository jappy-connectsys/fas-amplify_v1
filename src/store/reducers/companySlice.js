import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getCompanies = createAsyncThunk(
  'company/getCompanies', 
  async () => {
  try {
      const response = await api.get(`/items/company/`)
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

export const createCompany = createAsyncThunk(
  'company/createCompany', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/company/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updateCompany = createAsyncThunk(
  'company/updateCompany', 
  async (initialPost) => {
  const { company_id } = initialPost;
  try {
      const response = await api.patch(`/items/company/${company_id}`, initialPost)
      //console.log('company data: ' + response.data.data);
      
      if (response?.status === 200) return initialPost;
        //return `${response?.status}: ${response?.statusText}`;
        return response.data.data;
  } catch (err) {
      console.error("Error response:");
      console.error(err.response.data); 
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
      //return initialPost; // only for testing Redux!
  }
});

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/company/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});

//Initial State
const initialState = {
  data: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getCompanies.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCompanies.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
    });
    builder.addCase(getCompanies.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createCompany.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createCompany.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(createCompany.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updateCompany.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateCompany.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.company_id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const companies = state.data.filter(post => post.company_id !== id);
        state.data = [...companies, action.payload];
    });
    builder.addCase(updateCompany.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deleteCompany.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.company_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const companies = state.posts.filter(post => post.company_id !== id);
      state.data = companies;
    });
    builder.addCase(deleteCompany.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectCompanies = (state) => state.company;
export const selectCompanyId = (state, id) => state.company.data.find((post) => post.company_id === id);

export default companySlice.reducer;