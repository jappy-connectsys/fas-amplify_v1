import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  loading: 'idle',
  data: [],
  message: null,
}

export const GetCompanies = createAsyncThunk(
  'company/GetCompanies',
  async (_, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.get(`/items/company`)
          return response.data.data;
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const AddCompany = createAsyncThunk(
  'company/AddCompany',
  async (payload, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.post(`/items/company`,payload)
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const UpdateCompany = createAsyncThunk(
  'company/UpdateCompany',
  async (payload, { rejectWithValue, dispatch }) => {
      const { id, ...rest } = payload;
      try {
          const response = await api.patch(`/items/company/${id}`,{...rest})
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const ClearCompanies = createAsyncThunk(
  'company/ClearCompanies',
  async (_, { rejectWithValue, dispatch }) => {
      return true;
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearCompanies.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = null;
    });

    builder.addCase(GetCompanies.pending, (state, action) => {
        state.loading = 'loading';
    });
    builder.addCase(GetCompanies.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(GetCompanies.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(AddCompany.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(AddCompany.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(AddCompany.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(UpdateCompany.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(UpdateCompany.fulfilled, (state, action) => {
        state.loading = 'success';
    });
    builder.addCase(UpdateCompany.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

  },

})

export const selectCompanies = (state) => state.company;
export const selectCompanyId = (state, id) => state.company.data.find((post) => post.company_id === id);

export default companySlice.reducer;