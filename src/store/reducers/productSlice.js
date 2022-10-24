import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  loading: 'idle',
  data: [],
  message: null,
}

export const GetProducts = createAsyncThunk(
  'product/GetProducts',
  async (_, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.get(`/items/product`)
          return response.data.data;
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const AddProduct = createAsyncThunk(
  'product/AddProduct',
  async (payload, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.post(`/items/product`,payload)
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const UpdateProduct = createAsyncThunk(
  'product/UpdateProduct',
  async (payload, { rejectWithValue, dispatch }) => {
      const { id, ...rest } = payload;
      try {
          const response = await api.patch(`/items/product/${id}`,{...rest})
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const ClearProducts = createAsyncThunk(
  'product/ClearProducts',
  async (_, { rejectWithValue, dispatch }) => {
      return true;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearProducts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = null;
    });

    builder.addCase(GetProducts.pending, (state, action) => {
        state.loading = 'loading';
    });
    builder.addCase(GetProducts.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(GetProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(AddProduct.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(AddProduct.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(AddProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(UpdateProduct.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(UpdateProduct.fulfilled, (state, action) => {
        state.loading = 'success';
    });
    builder.addCase(UpdateProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

  },

})

export const selectProducts = (state) => state.product;
export const selectProductId = (state, id) => state.product.data.find((post) => post.product_id === id);

export default productSlice.reducer;