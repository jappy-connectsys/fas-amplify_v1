import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const getCountries = createAsyncThunk(
  'country/getCountries', 
  async () => {
  try {
      const response = await api.get(`/items/country/`)
      return response.data.data;
  } catch (err) {
    if (!err.response) {
      throw err
    }
    console.error(err.response.data);
    console.error(err.response.status);
    console.error(err.response.headers);
  }
});

export const createCountry = createAsyncThunk(
  'country/createCountry', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/country/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updateCountry = createAsyncThunk(
  'country/updateCountry', 
  async (initialPost) => {
  const { country_id } = initialPost;
  try {
      const response = await api.patch(`/items/country/${country_id}`, initialPost)
      if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      console.error("Error response:");
      console.error(err.response.data); 
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
      //return initialPost; // only for testing Redux!
  }
});

export const deleteCountry = createAsyncThunk(
  'country/deleteCountry', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/country/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});


//Initial State
const initialState = {
  countriesData: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getCountries.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
        state.status = 'success';
        state.countriesData = action.payload;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createCountry.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createCountry.fulfilled, (state, action) => {
      state.status = 'success';
      state.countriesData = action.payload;
    });
    builder.addCase(createCountry.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updateCountry.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateCountry.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.country_id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const countries = state.data.filter(post => post.country_id !== id);
        state.data = [...countries, action.payload];
    });
    builder.addCase(updateCountry.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deleteCountry.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteCountry.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.country_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const countries = state.posts.filter(post => post.country_id !== id);
      state.countriesData = countries;
    });
    builder.addCase(deleteCountry.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectCountries = (state) => state.country;
export const selectCountryId = (state, id) => state.country.countriesData.find(post => post.country_id === id);

export default countrySlice.reducer;