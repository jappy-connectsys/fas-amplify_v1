import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const getPaymentModes = createAsyncThunk(
  'paymentmode/getPaymentModes', 
  async () => {
  try {
      const response = await api.get(`/items/payment_mode/`)
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

export const createPaymentMode = createAsyncThunk(
  'paymentmode/createPaymentMode', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/payment_mode/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updatePaymentMode = createAsyncThunk(
  'paymentmode/updatePaymentMode', 
  async (initialPost) => {
  const { payment_mode } = initialPost;
  try {
      const response = await api.patch(`/items/payment_mode/${payment_mode}`, initialPost)
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

export const deletePaymentMode = createAsyncThunk(
  'paymentmode/deletePaymentMode', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/payment_mode/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});


//Initial State
const initialState = {
  pmodesData: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const paymentmodeSlice = createSlice({
  name: "paymentmode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getPaymentModes.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPaymentModes.fulfilled, (state, action) => {
        state.status = 'success';
        state.pmodesData = action.payload;
    });
    builder.addCase(getPaymentModes.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createPaymentMode.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createPaymentMode.fulfilled, (state, action) => {
      state.status = 'success';
      state.pmodesData = action.payload;
    });
    builder.addCase(createPaymentMode.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updatePaymentMode.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updatePaymentMode.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.payment_mode) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const paymentmodes = state.data.filter(post => post.payment_mode !== id);
        state.pmodesData = [...paymentmodes, action.payload];
    });
    builder.addCase(updatePaymentMode.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deletePaymentMode.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deletePaymentMode.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.payment_mode) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const paymentmodes = state.posts.filter(post => post.payment_mode !== id);
      state.pmodesData = paymentmodes;
    });
    builder.addCase(deletePaymentMode.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectPaymentModes = (state) => state.paymentmode;
export const selectPaymentmodeName = (state, id) => state.paymentmode.pmodesData.find(post => post.payment_mode === id);

export default paymentmodeSlice.reducer;