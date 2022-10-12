import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getVendorPrices = createAsyncThunk(
   'vendorprice/getVendorPrices', 
   async () => {
   try {
       const response = await api.get(`/items/vendor_price/`)
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
 
 export const createVendorPrice = createAsyncThunk(
   'vendorprice/createVendorPrice', 
   async (initialPost) => {
   try {
       const response = await api.post(`/items/vendor_price/`, initialPost)
       return response.data.data
   } catch (err) {
       console.error(err.response.data);
       console.error(err.response.status);
       console.error(err.response.headers);
       return err.response.data;
   }
 });
 
 export const updateVendorPrice = createAsyncThunk(
   'vendorprice/updateVendorPrice', 
   async (initialPost) => {
   const { vendor_id } = initialPost;
   try {
       const response = await api.patch(`/items/vendor_price/${vendor_id}`, initialPost)
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
 
 export const deleteVendorPrice = createAsyncThunk(
   'vendorprice/deleteVendorPrice', 
   async (initialPost) => {
   const { id } = initialPost;
   try {
       const response = await api.delete(`/items/vendor_price/${id}`)
       if (response?.status === 200) return initialPost;
       return `${response?.status}: ${response?.statusText}`;
   } catch (err) {
       return err.message;
   }
 });
 
 
 //Initial State
 const initialState = {
   prices:[],
   vendors: [],
   products: [],
   status: 'idle',
   error: null,
 }

export const vendorpriceSlice = createSlice({
  name: "vendorprice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getVendorPrices.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getVendorPrices.fulfilled, (state, action) => {
        state.status = 'success';
        state.prices = action.payload;
    });
    builder.addCase(getVendorPrices.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createVendorPrice.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createVendorPrice.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(createVendorPrice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updateVendorPrice.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateVendorPrice.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.vendor_price_id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const vendorprices = state.data.filter(post => post.vendor_price_id !== id);
        state.data = [...vendorprices, action.payload];
    });
    builder.addCase(updateVendorPrice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deleteVendorPrice.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteVendorPrice.fulfilled, (state, action) => {
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
    builder.addCase(deleteVendorPrice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectVendorPrices = (state) => state.vendorprice;
export const selectVendorPriceId = (state, id) => state.vendorprice.prices.find(post => post.vendor_price_id === id);

export default vendorpriceSlice.reducer;