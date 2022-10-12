import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

const InitialState = {
    customerWarehouseLoading: 'idle',
    customerWarehouseData: [],
    customerWarehouseError: null,

    customerWarehouseAddLoading: 'idle',
    customerWarehouseAddError: null,
}

export const ClearCustomerWarehouse = createAsyncThunk(
    'customer_warehouse/clear_customer_warehouse',
    async () => {
        return true;
    }
)

export const GetCustomerWarehouse = createAsyncThunk(
    'customer_warehouse/get_customer_warehouse',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/items/customer_warehouse`)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const AddCustomerWarehouse = createAsyncThunk(
    'customer_warehouse/add_customer_warehouse',
    async (initial, { rejectWithValue, _ }) => {
        const { id, ...rest} = initial
        try {
            const response = await api.post(`/items/customer_warehouse`, {...rest})
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const UpdateCustomerWarehouse = createAsyncThunk(
    'customer_warehouse/update_customer_warehouse',
    async (initial, { rejectWithValue, _ }) => {
        const { id, ...rest} = initial
        try {
            const response = await api.patch(`/items/customer_warehouse/${id}`, {...rest})
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)



export const customer_warehouse = createSlice({
  name: "customer_warehouse",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearCustomerWarehouse.fulfilled, (state, action) => {
        state.customerWarehouseLoading = 'idle';
        state.customerWarehouseError = null;
        state.customerWarehouseAddLoading = 'idle';
        state.customerWarehouseAddError = null;
    });

    builder.addCase(GetCustomerWarehouse.pending, (state) => {
        state.customerWarehouseLoading = 'loading';
    });
    builder.addCase(GetCustomerWarehouse.fulfilled, (state, action) => {
        state.customerWarehouseLoading = 'success';
        state.customerWarehouseData = action.payload;
    });
    builder.addCase(GetCustomerWarehouse.rejected, (state, action) => {
        state.customerWarehouseLoading = 'failed';
        state.customerWarehouseError = action.payload
    });

    builder.addCase(AddCustomerWarehouse.pending, (state) => {
        state.customerWarehouseAddLoading = 'loading';
    });
    builder.addCase(AddCustomerWarehouse.fulfilled, (state, action) => {
        state.customerWarehouseAddLoading = 'success';
    });
    builder.addCase(AddCustomerWarehouse.rejected, (state, action) => {
        state.customerWarehouseAddLoading = 'failed';
        state.customerWarehouseAddError = action.payload
    });

    builder.addCase(UpdateCustomerWarehouse.pending, (state) => {
        state.customerWarehouseAddLoading = 'loading';
    });
    builder.addCase(UpdateCustomerWarehouse.fulfilled, (state, action) => {
        state.customerWarehouseAddLoading = 'success';
    });
    builder.addCase(UpdateCustomerWarehouse.rejected, (state, action) => {
        state.customerWarehouseAddLoading = 'failed';
        state.customerWarehouseAddError = action.payload
    });
  },

  
})

export const selectCustomerWarehouse = (state) => state.customer_warehouse;
export default customer_warehouse.reducer;