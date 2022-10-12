import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getCustomers = createAsyncThunk(
  'customer/getCustomers', 
  async () => {
  try {
      const response = await api.get(`/items/customer/`)
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

export const createCustomer = createAsyncThunk(
  'customer/createCustomer', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/customer/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer', 
  async (initialPost) => {
  const { customer_id } = initialPost;
  try {
      const response = await api.patch(`/items/customer/${customer_id}`, initialPost)
      console.log('updated: ' + response.data.data);      
      if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
        //return response.data.data;
  } catch (err) {
      console.error("Error response:");
      console.error(err.response.data); 
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
      //return initialPost; // only for testing Redux!
  }
});

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/customer/${id}`)
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

const customerSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getCustomers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
    });
    builder.addCase(getCustomers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createCustomer.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updateCustomer.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.customer_id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const customer = state.data.filter(post => post.customer_id !== id);
        state.data = [...customer, action.payload];
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deleteCustomer.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.customer_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const customers = state.posts.filter(post => post.customer_id !== id);
      state.data = customers;
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectCustomers = (state) => state.customer;
export const selectCustomerId = (state, id) => state.customer.data.find((post) => post.customer_id === id);

export default customerSlice.reducer;