import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

const InitialState = {
    companyWarehouseLoading: 'idle',
    companyWarehouseData: [],
    companyWarehouseError: null,

    companyWarehouseAddLoading: 'idle',
    companyWarehouseAddError: null,
}

export const ClearCompanyWarehouse = createAsyncThunk(
    'company_warehouse/clear_company_warehouse',
    async () => {
        return true;
    }
)

export const GetCompanyWarehouse = createAsyncThunk(
    'company_warehouse/get_company_warehouse',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/items/company_warehouse`)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const AddCompanyWarehouse = createAsyncThunk(
    'company_warehouse/add_company_warehouse',
    async (initial, { rejectWithValue }) => {
        const { id, ...rest} = initial
        try {
            const response = await api.post(`/items/company_warehouse`, {...rest})
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const UpdateCompanyWarehouse = createAsyncThunk(
    'company_warehouse/update_company_warehouse',
    async (initial, { rejectWithValue, _ }) => {
        const { id, ...rest} = initial
        try {
            const response = await api.patch(`/items/company_warehouse/${id}`, {...rest})
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)



export const company_warehouse = createSlice({
  name: "company_warehouse",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearCompanyWarehouse.fulfilled, (state, action) => {
        state.companyWarehouseLoading = 'idle';
        state.companyWarehouseError = null;
        state.companyWarehouseAddLoading = 'idle';
        state.companyWarehouseAddError = null;
    });

    builder.addCase(GetCompanyWarehouse.pending, (state) => {
        state.companyWarehouseLoading = 'loading';
    });
    builder.addCase(GetCompanyWarehouse.fulfilled, (state, action) => {
        state.companyWarehouseLoading = 'success';
        state.companyWarehouseData = action.payload;
    });
    builder.addCase(GetCompanyWarehouse.rejected, (state, action) => {
        state.companyWarehouseLoading = 'failed';
        state.companyWarehouseError = action.payload
    });

    builder.addCase(AddCompanyWarehouse.pending, (state) => {
        state.companyWarehouseAddLoading = 'loading';
    });
    builder.addCase(AddCompanyWarehouse.fulfilled, (state, action) => {
        state.companyWarehouseAddLoading = 'success';
    });
    builder.addCase(AddCompanyWarehouse.rejected, (state, action) => {
        state.companyWarehouseAddLoading = 'failed';
        state.companyWarehouseAddError = action.payload
    });

    builder.addCase(UpdateCompanyWarehouse.pending, (state) => {
        state.companyWarehouseAddLoading = 'loading';
    });
    builder.addCase(UpdateCompanyWarehouse.fulfilled, (state, action) => {
        state.companyWarehouseAddLoading = 'success';
    });
    builder.addCase(UpdateCompanyWarehouse.rejected, (state, action) => {
        state.companyWarehouseAddLoading = 'failed';
        state.companyWarehouseAddError = action.payload
    });
  },

  
})

export const selectCompanyWarehouse = (state) => state.company_warehouse;
export default company_warehouse.reducer;