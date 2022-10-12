import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const InitialState = {
    roleLoading: 'idle',
    roleData: [],
    roleError: null,

    roleAddLoading: 'idle',
    roleAddData: [],
    roleAddError: null,

    roleEditLoading: 'idle',
    roleEditData: [],
    roleEditError: null
}

export const ClearRole = createAsyncThunk(
    'role/clear_role',
    async (_, { rejectWithValue, dispatch }) => {
        return true;
    }
)

export const GetRole = createAsyncThunk(
    'role/get_role',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.get(`/roles`)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const AddRole = createAsyncThunk(
    'role/add_role',
    async (payload, { rejectWithValue, _ }) => {
        try {
            const response = await api.post(`/roles`, payload)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const EditRole = createAsyncThunk(
    'role/edit_role',
    async (payload, { rejectWithValue, _ }) => {
        const { id, ...rest } = payload
        try {
            const response = await api.patch(`/roles/${id}`, {...rest})
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const role = createSlice({
  name: "role",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleError = null;
        state.roleAddLoading = 'idle';
        state.roleAddError = null;
        state.roleEditLoading = 'idle';
        state.roleEditError = null;
    });

    builder.addCase(GetRole.pending, (state) => {
        state.roleLoading = 'loading';
    });
    builder.addCase(GetRole.fulfilled, (state, action) => {
        state.roleLoading = 'success';
        state.roleData = action.payload;
    });
    builder.addCase(GetRole.rejected, (state, action) => {
        state.roleLoading = 'failed';
        state.roleError = action.payload
    });

    builder.addCase(AddRole.pending, (state) => {
        state.roleAddLoading = 'loading';
    });
    builder.addCase(AddRole.fulfilled, (state, action) => {
        state.roleAddLoading = 'success';
        state.roleAddData = action.payload;
    });
    builder.addCase(AddRole.rejected, (state, action) => {
        state.roleAddLoading = 'failed';
        state.roleAddError = action.payload
    });

    builder.addCase(EditRole.pending, (state) => {
        state.roleEditLoading = 'loading';
    });
    builder.addCase(EditRole.fulfilled, (state, action) => {
        state.roleEditLoading = 'success';
        state.roleEditData = action.payload;
    });
    builder.addCase(EditRole.rejected, (state, action) => {
        state.roleEditLoading = 'failed';
        state.roleEditError = action.payload
    });
  },

  
})

export const selectRole = (state) => state.role;
export default role.reducer;