import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../store/middleware/directus'

//Selection dropdowns
export const getFasReference = createAsyncThunk(
   "fasreference/getFasReference", 
   async () => {
     return await axiosInstance
       .get(`/items/fas_reference/`)
       .then((res) => res.data.data)
       .catch((error) => error.message)
   }
); 

export const getCountries = createAsyncThunk(
   "fasreference/getCountries", 
   async () => {
     return await axiosInstance
       .get(`/items/country/`)
       .then((res) => res.data.data)
       .catch((error) => error.message)
   }
); 

export const getPaymentMode = createAsyncThunk(
   "fasreference/getPaymentMode", 
   async ({ id }) => {
     //Fetch by ID
     return await axiosInstance
       .get(`items/payment_mode/`)
       .then((res) => res.data.data)
       .catch((error) => error.message)
   }
); 

export const getCurrency = createAsyncThunk(
   "fasreference/getCurrency", 
   async ({ id }) => {
     //Fetch customers by ID
     return await axiosInstance
       .get(`items/currency/`)
       .then((res) => res.data.data)
       .catch((error) => error.message)
   }
);

export const getPostingGroup = createAsyncThunk(
  "fasreference/getPostingGroup", 
  async () => {
    return await axiosInstance
      .get(`items/posting_group/`)
      .then((res) => res.data.data)
      .catch((error) => error.message)
  }
); 


const initialState = {
  fasref: [],
  currency: [],
  countries: [],
  paymentmode: [],
  postinggroup: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: "",
}

const fasreferenceSlice = createSlice({
  name: 'fasreference',
  initialState,
  reducers: {},
  extraReducers: {
    [getFasReference.pending]: (state) => {
      state.status = 'loading';
    },
    [getFasReference.fulfilled]: (state, action) => {
      state.status = 'success';
      state.fasref = [action.payload];
    },
    [getFasReference.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [getCurrency.pending]: (state) => {
      state.status = 'loading';
    },
    [getCurrency.fulfilled]: (state, action) => {
      state.status = 'success';
      state.currency = [action.payload];
    },
    [getCurrency.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [getCountries.pending]: (state) => {
      state.status = 'loading';
    },
    [getCountries.fulfilled]: (state, action) => {
      state.status = 'success';
      state.countries = [action.payload];
    },
    [getCountries.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [getPaymentMode.pending]: (state) => {
      state.status = 'loading';
    },
    [getPaymentMode.fulfilled]: (state, action) => {
      state.status = 'success';
      state.paymentmode = [action.payload];
    },
    [getPaymentMode.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [getPostingGroup.pending]: (state) => {
      state.status = 'loading';
    },
    [getPostingGroup.fulfilled]: (state, action) => {
      state.status = 'success';
      state.postinggroup = [action.payload];
    },
    [getPostingGroup.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  }
})

export default fasreferenceSlice.reducer;


export const selectAllFasRef = (state) => state.fasreference.fasref;
export const selectAllCurrency = (state) => state.fasreference.currency;
export const selectAllCountries = (state) => state.fasreference.countries;
export const selectAllPaymentMode = (state) => state.fasreference.paymentmode;
export const selectAllPostingGroup = (state) => state.fasreference.postinggroup;