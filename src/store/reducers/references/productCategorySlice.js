import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const getProductCategory = createAsyncThunk(
  'product_category/getProductCategory', 
  async () => {
  try {
      const response = await api.get(`/items/product_category/`)
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

export const createProductCategory = createAsyncThunk(
  'product_category/createProductCategory', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/product_category/`, initialPost)
      return response.data.data;
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updateProductCategory = createAsyncThunk(
  'product_category/updateProductCategory', 
  async (initialPost) => {
  const { category_id } = initialPost;
  try {
      const response = await api.patch(`/items/product_category/${category_id}`, initialPost)
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

export const deleteProductCategory = createAsyncThunk(
  'product_category/deleteProductCategory', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/product_category/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})


//Initial State
const initialState = {
  pcategoryData: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const productCategorySlice = createSlice({
  name: "product_category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getProductCategory.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getProductCategory.fulfilled, (state, action) => {
        state.status = 'success';
        state.pcategoryData = action.payload;
    });
    builder.addCase(getProductCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createProductCategory.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createProductCategory.fulfilled, (state, action) => {
        if (action.payload === true) {
          state.status = 'success';
          state.pcategoryData = action.payload;
        }
    });
    builder.addCase(createProductCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* UPDATE */
    builder.addCase(updateProductCategory.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateProductCategory.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.category_id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const product_categories = state.pcategoryData.filter(post => post.category_id !== id);
        state.data = [...product_categories, action.payload];
    });
    builder.addCase(updateProductCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* DELETE */
    builder.addCase(deleteProductCategory.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteProductCategory.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.category_id) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const product_categories = state.pcategoryData.filter(post => post.category_id !== id);
      state.pcategoryData = product_categories;
    });
    builder.addCase(deleteProductCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });
  },
});


export const selectProductCategories = (state) => state.productcategory;
export const selectProductCategoryId = (state, id) => state.productcategory.pcategoryData.find(post => post.category_id === id);

export default productCategorySlice.reducer;