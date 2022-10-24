import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  loading: 'idle',
  data: [],
  message: null,
}

export const GetProductCategories = createAsyncThunk(
  'productcategory/GetProductCategories',
  async (_, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.get(`/items/product_category`)
          return response.data.data;
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const AddProductCategory = createAsyncThunk(
  'productcategory/AddProductCategory',
  async (payload, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.post(`/items/product_category`,payload)
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const UpdateProductCategory = createAsyncThunk(
  'productcategory/UpdateProductCategory',
  async (payload, { rejectWithValue, dispatch }) => {
      const { id, ...rest } = payload;
      try {
          const response = await api.patch(`/items/product_category/${id}`,{...rest})
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const ClearProductCategories = createAsyncThunk(
  'productcategory/ClearProductCategories',
  async (_, { rejectWithValue, dispatch }) => {
      return true;
  }
);

export const productcategorySlice = createSlice({
  name: "productcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearProductCategories.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = null;
    });

    builder.addCase(GetProductCategories.pending, (state, action) => {
        state.loading = 'loading';
    });
    builder.addCase(GetProductCategories.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(GetProductCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(AddProductCategory.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(AddProductCategory.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(AddProductCategory.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(UpdateProductCategory.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(UpdateProductCategory.fulfilled, (state, action) => {
        state.loading = 'success';
    });
    builder.addCase(UpdateProductCategory.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

  },

})

export const selectProductCategories = (state) => state.productcategory;
export const selectPaymentModeId = (state, id) => state.productcategory.data.find((post) => post.product_category_id === id);

export default productcategorySlice.reducer;