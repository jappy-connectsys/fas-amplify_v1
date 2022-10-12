import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const getPaymentTerms = createAsyncThunk(
  'paymentterm/getPostingGroup', 
  async () => {
  try {
      const response = await api.get(`/items/payment_terms/`)
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

export const createPaymentTerms = createAsyncThunk(
  'paymentterm/createPaymentTerms', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/payment_terms/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updatePaymentTerms = createAsyncThunk(
  'paymentterm/updatePaymentTerms', 
  async (initialPost) => {
  const { payment_mode } = initialPost;
  try {
      const response = await api.patch(`/items/payment_terms/${payment_mode}`, initialPost)
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

export const deletePaymentTerms = createAsyncThunk(
  'paymentterm/deletePaymentTerms', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/payment_terms/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});


//Initial State
const initialState = {
  ptermsData: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const paymenttermSlice = createSlice({
  name: "paymentterm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getPaymentTerms.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPaymentTerms.fulfilled, (state, action) => {
        state.status = 'success';
        state.ptermsData = action.payload;
    });
    builder.addCase(getPaymentTerms.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createPaymentTerms.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createPaymentTerms.fulfilled, (state, action) => {
      state.status = 'success';
      state.ptermsData = action.payload;
    });
    builder.addCase(createPaymentTerms.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updatePaymentTerms.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updatePaymentTerms.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.payment_terms) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const paymentterms = state.data.filter(post => post.payment_terms !== id);
        state.ptermsData = [...paymentterms, action.payload];
    });
    builder.addCase(updatePaymentTerms.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deletePaymentTerms.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deletePaymentTerms.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.payment_terms) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const paymentterms = state.posts.filter(post => post.payment_terms !== id);
      state.ptermsData = paymentterms;
    });
    builder.addCase(deletePaymentTerms.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectPaymentTerms = (state) => state.paymentterm;
export const selectPaymentTermsName = (state, id) => 
  {state.paymentterm.ptermsData.filter(name => name.payment_terms.includes(id)).map(filteredName => (
    filteredName.payment_terms
  ))}

export default paymenttermSlice.reducer;