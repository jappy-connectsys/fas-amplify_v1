import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const InitialState = {
    usersLoading: 'idle',
    usersData: [],
    usersError: null,

    userAddLoading: 'idle',
    userAddData: [],
    userAddError: null,

    userEditLoading: 'idle',
    userEditData: [],
    userEditError: null
}

export const GetUsers = createAsyncThunk(
    'user_management/get_users',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.get(`/users`)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const AddUser = createAsyncThunk(
    'user_management/add_user',
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.post(`/users`,payload)
            console.log('~~~', response);
            return true
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const UpdateUser = createAsyncThunk(
    'user_management/update_user',
    async (payload, { rejectWithValue, dispatch }) => {
        const { id, ...rest } = payload;
        try {
            const response = await api.patch(`/users/${id}`,{...rest})
            console.log('~~~', response);
            return true
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const ClearUserManagement = createAsyncThunk(
    'user_management/clear_user_management',
    async (_, { rejectWithValue, dispatch }) => {
        return true;
    }
)

export const user_management = createSlice({
  name: "user_management",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearUserManagement.fulfilled, (state, action) => {
        state.usersLoading = 'idle'
        state.usersError = null

        state.userAddLoading = 'idle'
        state.userAddError = null
    });

    builder.addCase(GetUsers.pending, (state) => {
        state.usersLoading = 'loading';
    });
    builder.addCase(GetUsers.fulfilled, (state, action) => {
        state.usersLoading = 'success';
        state.usersData = action.payload;
    });
    builder.addCase(GetUsers.rejected, (state, action) => {
        state.usersLoading = 'failed';
        state.usersError = action.payload
    });

    builder.addCase(AddUser.pending, (state) => {
        state.userAddLoading = 'loading';
    });
    builder.addCase(AddUser.fulfilled, (state, action) => {
        state.userAddLoading = 'success';
        state.userAddData = action.payload;
    });
    builder.addCase(AddUser.rejected, (state, action) => {
        state.userAddLoading = 'failed';
        state.userAddError = action.payload
    });

  },

  
})

export const selectUserManagement = (state) => state.user_management;
export default user_management.reducer;