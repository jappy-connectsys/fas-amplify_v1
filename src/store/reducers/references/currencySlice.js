import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const getCurrencies = createAsyncThunk(
  'currency/getCurrencies', 
  async () => {
  try {
      const response = await api.get(`/items/currency/`)
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

export const createCurrency = createAsyncThunk(
  'currency/createCurrency', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/currency/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updateCurrency = createAsyncThunk(
  'currency/updateCurrency', 
  async (initialPost) => {
  const { currency_code } = initialPost;
  try {
      const response = await api.patch(`/items/currency/${currency_code}`, initialPost)
      console.log('update: ' + response.data.data)
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

export const deleteCurrency = createAsyncThunk(
  'currency/deleteCurrency', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/currency/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});


//Initial State
const initialState = {
  currenciesData: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getCurrencies.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCurrencies.fulfilled, (state, action) => {
        state.status = 'success';
        state.currenciesData = action.payload;
    });
    builder.addCase(getCurrencies.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createCurrency.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createCurrency.fulfilled, (state, action) => {
      state.status = 'success';
      state.currenciesData = action.payload;
    });
    builder.addCase(createCurrency.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updateCurrency.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateCurrency.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.currency_code) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const currencies = state.data.filter(post => post.currency_code !== id);
        state.currenciesData = [...currencies, action.payload];
    });
    builder.addCase(updateCurrency.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deleteCurrency.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteCurrency.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.currency_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const currencies = state.posts.filter(post => post.currency_id !== id);
      state.currenciesData = currencies;
    });
    builder.addCase(deleteCurrency.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectCurrencies = (state) => state.currency;
export const selectCurrencyId = (state, id) => state.currency.currenciesData.find(post => post.currency_code === id);

export default currencySlice.reducer;