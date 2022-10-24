import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  loading: 'idle',
  data: [],
  message: null,
}

export const GetPostingGroups = createAsyncThunk(
  'pstgroup/GetPostingGroups',
  async (_, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.get(`/items/posting_group`)
          return response.data.data;
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const AddPostingGroup = createAsyncThunk(
  'pstgroup/AddPostingGroup',
  async (payload, { rejectWithValue, dispatch }) => {
      try {
          const response = await api.post(`/items/posting_group`,payload)
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const UpdatePostingGroup = createAsyncThunk(
  'pstgroup/UpdatePostingGroup',
  async (payload, { rejectWithValue, dispatch }) => {
      const { id, ...rest } = payload;
      try {
          const response = await api.patch(`/items/posting_group/${id}`,{...rest})
          console.log('~~~', response);
          return true
      } catch (err) {
          return rejectWithValue(err.response.data)
      }
  }
);

export const ClearPostingGroups = createAsyncThunk(
  'pstgroup/ClearPostingGroups',
  async (_, { rejectWithValue, dispatch }) => {
      return true;
  }
);

export const pstgroupSlice = createSlice({
  name: "pstgroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ClearPostingGroups.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.message = null;
    });

    builder.addCase(GetPostingGroups.pending, (state, action) => {
        state.loading = 'loading';
    });
    builder.addCase(GetPostingGroups.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(GetPostingGroups.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(AddPostingGroup.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(AddPostingGroup.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
    });
    builder.addCase(AddPostingGroup.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

    builder.addCase(UpdatePostingGroup.pending, (state) => {
        state.loading = 'loading';
    });
    builder.addCase(UpdatePostingGroup.fulfilled, (state, action) => {
        state.loading = 'success';
    });
    builder.addCase(UpdatePostingGroup.rejected, (state, action) => {
        state.loading = 'failed';
        state.message = action.payload;
    });

  },

})

export const selectPostingGroups = (state) => state.pstgroup;
export const selectPostingGroupId = (state, id) => state.pstgroup.data.find((post) => post.pstgroup_id === id);

export default pstgroupSlice.reducer;