import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

//Initial State
const initialState = {
  data: [],
  loading: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  message: null,
}

export const GetCurrencies = createAsyncThunk(
  'currency/get_currencies',
  async (_, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.get(`/items/currency`)
          return response.data.data;
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
)

export const AddCurrency = createAsyncThunk(
  'currency/add_currency',
  async (payload, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.post(`/items/currency`,payload)
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
)

export const UpdateCurrency = createAsyncThunk(
  'currency/update_currency',
  async (payload, { rejectWithValue, dispatch }) => {
      const { id, ...rest } = payload;
      try {
          const response = await api.patch(`/items/currency/${id}`,{...rest})
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
)

export const ClearCurrencies = createAsyncThunk(
  'currency/clear_currency',
  async (_, { rejectWithValue, dispatch }) => {
      return true;
  }
)

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* CLEAR */
    builder.addCase(ClearCurrencies.fulfilled, (state) => {
      state.loading = 'idle'
      state.message = null
    });

    builder.addCase(GetCurrencies.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(GetCurrencies.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(GetCurrencies.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload
    });

    builder.addCase(AddCurrency.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(AddCurrency.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(AddCurrency.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload
    });

    builder.addCase(UpdateCurrency.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(UpdateCurrency.fulfilled, (state) => {
        state.loading = 'success';
    });
    builder.addCase(UpdateCurrency.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload
    });

  },
});

export const selectCurrencies = (state) => state.currency;
export const selectCurrencyId = (state, id) => state.currency.data.find(post => post.currency_code === id);

export default currencySlice.reducer;