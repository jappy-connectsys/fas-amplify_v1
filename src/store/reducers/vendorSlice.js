import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getVendors = createAsyncThunk(
  'vendor/getVendors', 
  async () => {
  try {
      const response = await api.get(`/items/vendor/`)
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

export const createVendor = createAsyncThunk(
  'vendor/createVendor', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/vendor/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updateVendor = createAsyncThunk(
  'vendor/updateVendor', 
  async (initialPost) => {
  const { vendor_id } = initialPost;
  try {
      const response = await api.patch(`/items/vendor/${vendor_id}`, initialPost)
      console.log('update vendor: ' + response.data.data)
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

export const deleteVendor = createAsyncThunk(
  'vendor/deleteVendor', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/vendor/${id}`)
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

export const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getVendors.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getVendors.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
    });
    builder.addCase(getVendors.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createVendor.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createVendor.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(createVendor.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updateVendor.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateVendor.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.vendor_id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const vendors = state.data.filter(post => post.vendor_id !== id);
        state.data = [...vendors, action.payload];
    });
    builder.addCase(updateVendor.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deleteVendor.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteVendor.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.vendor_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const vendors = state.posts.filter(post => post.vendor_id !== id);
      state.data = vendors;
    });
    builder.addCase(deleteVendor.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectVendors = (state) => state.vendor;
export const selectVendorId = (state, id) => state.vendor.data.find(post => post.vendor_id === id);

export default vendorSlice.reducer;