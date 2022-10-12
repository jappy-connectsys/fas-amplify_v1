import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getProducts = createAsyncThunk(
  'product/getProducts', 
  async () => {
  try {
      const response = await api.get(`/items/product?sort=-product_id`)
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

export const createProduct = createAsyncThunk(
  'product/createProduct', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/product/`, initialPost)
      console.log('created: ' + response.data.data)
      return response.data.data;
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updateProduct = createAsyncThunk(
  'product/updateProduct', 
  async (initialPost) => {
  const { product_id } = initialPost;
  try {
      const response = await api.patch(`/items/product/${product_id}`, initialPost)
      console.log('updated: ' + response.data.data)
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

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/product/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})


//Initial State
const initialState = {
  data: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getProducts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createProduct.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload === true) {
          state.status = 'success';
          state.data = action.payload;
        }
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* UPDATE */
    builder.addCase(updateProduct.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.product_id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const products = state.data.filter(post => post.product_id !== id);
        state.data = [...products, action.payload];
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* DELETE */
    builder.addCase(deleteProduct.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.product_id) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const products = state.posts.filter(post => post.vendor_id !== id);
      state.data = products;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });
  },
});


export const selectProducts = (state) => state.product;
export const selectProductId = (state, id) => state.product.data.find(post => post.product_id === id);
export const productExist = (state, pname) => state.product.data.find(post => post.product_name === pname);

export default productSlice.reducer;