import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  loading: 'idle',
  data: [],
  message: null,
}

export const GetCountries = createAsyncThunk(
  'country/GetCountries',
  async (_, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.get(`/items/country`)
          return response.data.data;
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const AddCompany = createAsyncThunk(
  'country/AddCompany',
  async (payload, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.post(`/items/country`,payload)
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const UpdateCountry = createAsyncThunk(
  'country/UpdateCountry',
  async (payload, { rejectWithValue, dispatch }) => {
      const { id, ...rest } = payload;
      try {
          const response = await api.patch(`/items/country/${id}`,{...rest})
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const ClearCountries = createAsyncThunk(
  'country/ClearCountries',
  async (_, { rejectWithValue, dispatch }) => {
      return true;
  }
);

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearCountries.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = null;
    });

    builder.addCase(GetCountries.pending, (state, action) => {
        state.loading = 'loading';
    });
    builder.addCase(GetCountries.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(GetCountries.rejected, (state, action) => {
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

    builder.addCase(UpdateCountry.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(UpdateCountry.fulfilled, (state, action) => {
        state.loading = 'success';
    });
    builder.addCase(UpdateCountry.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

  },

})

export const selectCountries = (state) => state.country;
export const selectCountryId = (state, id) => state.country.data.find((post) => post.country_id === id);

export default countrySlice.reducer;