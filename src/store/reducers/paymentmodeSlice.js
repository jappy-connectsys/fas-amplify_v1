import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  loading: 'idle',
  data: [],
  message: null,
}

export const GetPaymentModes = createAsyncThunk(
  'paymentmode/GetPaymentModes',
  async (_, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.get(`/items/payment_mode`)
          return response.data.data;
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const AddPaymentMode = createAsyncThunk(
  'paymentmode/AddPaymentMode',
  async (payload, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.post(`/items/payment_mode`,payload)
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const UpdatePaymentMode = createAsyncThunk(
  'paymentmode/UpdatePaymentMode',
  async (payload, { rejectWithValue, dispatch }) => {
      const { id, ...rest } = payload;
      try {
          const response = await api.patch(`/items/payment_mode/${id}`,{...rest})
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const ClearPaymentModes = createAsyncThunk(
  'paymentmode/ClearPaymentModes',
  async (_, { rejectWithValue, dispatch }) => {
      return true;
  }
);

export const paymentmodeSlice = createSlice({
  name: "paymentmode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearPaymentModes.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = null;
    });

    builder.addCase(GetPaymentModes.pending, (state, action) => {
        state.loading = 'loading';
    });
    builder.addCase(GetPaymentModes.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(GetPaymentModes.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(AddPaymentMode.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(AddPaymentMode.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(AddPaymentMode.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(UpdatePaymentMode.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(UpdatePaymentMode.fulfilled, (state, action) => {
        state.loading = 'success';
    });
    builder.addCase(UpdatePaymentMode.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

  },

})

export const selectPaymentModes = (state) => state.paymentmode;
export const selectPaymentModeId = (state, id) => state.paymentmode.data.find((post) => post.paymentmode_id === id);

export default paymentmodeSlice.reducer;