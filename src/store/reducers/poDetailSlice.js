import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getPoDetail = createAsyncThunk(
  'podetail/getPoDetail', 
  async (initialPost) => {
    const { po_header_id } = initialPost
  try {
    let response;
    if(po_header_id){
      response = await api.get(`/items/po_detail?filter[po_header_id][_eq]=`+po_header_id)
    }else{
      response = await api.get(`/items/po_detail`)
    }
    
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

export const getFilteredPoDetail = createAsyncThunk(
  'podetail/getFilteredPoDetail', 
  async (initialPost) => {
    const { po_header_id } = initialPost
  try {
    if(po_header_id){
      const response = await api.get(`/items/po_detail?filter[po_header_id][_eq]=`+po_header_id)
      return response.data.data;
    }
  } catch (err) {
    if (!err.response) {
      throw err
    }
    console.error(err.response.data);
    console.error(err.response.status);
    console.error(err.response.headers);
  }
});




export const createPoDetail = createAsyncThunk(
  'podetail/createPoDetail', 
  async (initialPost) => {
  const {po_detail_id, product_name, ...rest} = initialPost
  try {
      const response = await api.post(`/items/po_detail`, {...rest})
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updatePoDetail = createAsyncThunk(
  'podetail/updatePoDetail', 
  async (initialPost) => {
  const { id, po_detail_id, product_name, ...rest } = initialPost;
  const payload = {...rest}
  try {
      const response = await api.patch(`/items/po_detail/${po_detail_id}`, payload)
      console.log('update po: ' + response.data.data)
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

export const deletePoDetail = createAsyncThunk(
  'podetail/deletePoDetail', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/po_detail/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});


//Initial State
const initialState = {
  data: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const poDetailSlice = createSlice({
  name: "podetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getPoDetail.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPoDetail.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
    });
    builder.addCase(getPoDetail.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    builder.addCase(getFilteredPoDetail.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getFilteredPoDetail.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
    });
    builder.addCase(getFilteredPoDetail.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });
    
    /* CREATE */
    builder.addCase(createPoDetail.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createPoDetail.fulfilled, (state, action) => {
      state.status = 'success';
      // state.data = action.payload;
    });
    builder.addCase(createPoDetail.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });


    /* Update */
    builder.addCase(updatePoDetail.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updatePoDetail.fulfilled, (state, action) => {
        state.status = 'success';
        // const { po_detail_id } = action.payload;
        // action.payload.date_updated = new Date().toISOString();
        // const pos = state.data.filter(post => post.po_detail_id !== po_detail_id);
        // state.data = [...pos, action.payload];
    });
    builder.addCase(updatePoDetail.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

      /* DELETE */
    builder.addCase(deletePoDetail.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deletePoDetail.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.po_detail_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const pos = state.data.filter(post => post.po_detail_id !== id);
      state.data = pos;
    });
    builder.addCase(deletePoDetail.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const selectPoDetail = (state) => state.podetail;
export const selectPoDetailId = (state, id) => state.podetail.data.find(post => post.po_detail_id === id);


export default poDetailSlice.reducer;