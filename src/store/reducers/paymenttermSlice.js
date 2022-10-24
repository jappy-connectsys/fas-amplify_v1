import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  loading: 'idle',
  data: [],
  message: null,
}

export const GetPaymentTerms = createAsyncThunk(
  'paymentterm/GetPaymentTerms',
  async (_, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.get(`/items/payment_terms`)
          return response.data.data;
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const AddPaymentTerm = createAsyncThunk(
  'paymentterm/AddPaymentTerm',
  async (payload, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.post(`/items/payment_terms`,payload)
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const UpdatePaymentTerm = createAsyncThunk(
  'paymentterm/UpdatePaymentTerm',
  async (payload, { rejectWithValue, dispatch }) => {
      const { id, ...rest } = payload;
      try {
          const response = await api.patch(`/items/payment_terms/${id}`,{...rest})
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const ClearPaymentTerms = createAsyncThunk(
  'paymentterm/ClearPaymentTerms',
  async (_, { rejectWithValue, dispatch }) => {
      return true;
  }
);

export const paymenttermSlice = createSlice({
  name: "paymentterm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearPaymentTerms.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = null;
    });

    builder.addCase(GetPaymentTerms.pending, (state, action) => {
        state.loading = 'loading';
    });
    builder.addCase(GetPaymentTerms.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(GetPaymentTerms.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(AddPaymentTerm.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(AddPaymentTerm.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(AddPaymentTerm.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(UpdatePaymentTerm.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(UpdatePaymentTerm.fulfilled, (state, action) => {
        state.loading = 'success';
    });
    builder.addCase(UpdatePaymentTerm.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

  },

})

export const selectPaymentTerms = (state) => state.paymentterm;
export const selectPaymentTermId = (state, id) => state.paymentterm.data.find((post) => post.payment_term_id === id);

export default paymenttermSlice.reducer;