import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const getPostingGroups = createAsyncThunk(
  'pstgroup/getPostingGroup', 
  async () => {
  try {
      const response = await api.get(`/items/posting_group/`)
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

export const createPostingGroup = createAsyncThunk(
  'pstgroup/createPostingGroup', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/posting_group/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updatePostingGroup = createAsyncThunk(
  'pstgroup/updatePostingGroup', 
  async (initialPost) => {
  const { payment_mode } = initialPost;
  try {
      const response = await api.patch(`/items/posting_group/${payment_mode}`, initialPost)
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

export const deletePostingGroup = createAsyncThunk(
  'pstgroup/deletePostingGroup', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/posting_group/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});


//Initial State
const initialState = {
  pstgroupData: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const pstgroupSlice = createSlice({
  name: "pstgroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getPostingGroups.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPostingGroups.fulfilled, (state, action) => {
        state.status = 'success';
        state.pstgroupData = action.payload;
    });
    builder.addCase(getPostingGroups.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createPostingGroup.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createPostingGroup.fulfilled, (state, action) => {
      state.status = 'success';
      state.pstgroupData = action.payload;
    });
    builder.addCase(createPostingGroup.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updatePostingGroup.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updatePostingGroup.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.posting_group_type) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const pstgroups = state.data.filter(post => post.posting_group_type !== id);
        state.pstgroupData = [...pstgroups, action.payload];
    });
    builder.addCase(updatePostingGroup.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deletePostingGroup.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deletePostingGroup.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.posting_group_type) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const pstgroups = state.posts.filter(post => post.posting_group_type !== id);
      state.pstgroupData = pstgroups;
    });
    builder.addCase(deletePostingGroup.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectPostingGroups = (state) => state.pstgroup;
export const selectPostingGroupName = (state, id) => 
  {state.pstgroup.pstgroupData.filter(name => name.posting_group_type.includes(id)).map(filteredName => (
    filteredName.posting_group_name
  ))}

export default pstgroupSlice.reducer;