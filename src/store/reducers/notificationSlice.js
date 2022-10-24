import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const InitialState = {
    notificationLoading: 'idle',
    notificationData: [],
    notificationError: null,
}

export const ClearNotification = createAsyncThunk(
    'notification/clear_notification',
    async () => {
        return true;
    }
)

export const ReadNotification = createAsyncThunk(
    'notification/read_notification',
    async (id) => {
        const payload = {
            read_at: new Date().toISOString()
        }
        try {
            const response = await api.patch(`/items/notification/${id}`, payload)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)


export const GetNotification = createAsyncThunk(
    'notification/get_notification',
    async (user_id) => {
        try {
            const response = await api.get(`/items/notification?filter[recipient][_eq]=${user_id}`)
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const notification = createSlice({
  name: "notification",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearNotification.fulfilled, (state, action) => {
        state.notificationLoading = 'loading';
        state.notificationError = null;
    });

    builder.addCase(GetNotification.pending, (state) => {
        state.notificationLoading = 'loading';
    });
    builder.addCase(GetNotification.fulfilled, (state, action) => {
        state.notificationLoading = 'success';
        state.notificationData = action.payload;
    });
    builder.addCase(GetNotification.rejected, (state, action) => {
        state.notificationLoading = 'failed';
        state.notificationError = action.payload
    });

    builder.addCase(ReadNotification.pending, (state) => {
        state.notificationLoading = 'loading';
    });
    builder.addCase(ReadNotification.fulfilled, (state, action) => {
        state.notificationLoading = 'success';
    });
    builder.addCase(ReadNotification.rejected, (state, action) => {
        state.notificationLoading = 'failed';
        state.notificationError = action.payload
    });
  },

  
})

export const selectNotification = (state) => state.notification;
export default notification.reducer;