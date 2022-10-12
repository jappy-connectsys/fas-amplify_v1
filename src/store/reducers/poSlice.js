import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import axios from 'axios';
import { REACT_APP_DIRECTUS_TOKEN } from '../../config';

export const getPo = createAsyncThunk(
  'po/getPo', 
  async (initialPost) => {
    const { po_header_id, search_po_number } = initialPost
  try {
    let response;
    if(po_header_id){
        response = await api.get(`/items/po_header?filter[po_header_id][_eq]=`+po_header_id)
    }else if(search_po_number){
      response = await api.get(`/items/po_header?filter[id][_eq]=`+search_po_number)
    }else{
        response = await api.get(`/items/po_header/`)
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

export const getPOUsersApprover = createAsyncThunk(
  'po/getPOUsersApprover', 
  async (initialPost, { rejectWithValue, dispatch }) => {
    const { user_id, po_number, po_id } = initialPost
    try {
      const response = await api.get('/users?filter[role][_eq]=AE1D3FF9-AA50-4C02-B221-2F7BDD9AB9B2')
      const users = response.data.data
        users.map(res=>{
          let payload = {
            collection: "po",
            status: "Active",
            recipient: res.id,
            sender: user_id,
            subject: "PO For Approval",
            message: `The PO Number ${po_number} is ready to approve`,
            reference_id:po_id,
          }
          console.log('~~', payload);
          dispatch(sendPONotification(payload))
      })
     
    
      return true
    } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
   }
});

export const sendPONotification = createAsyncThunk(
  'po/sendPONotification', 
  async (payload) => {
    try {
      await api.post('/items/notification',payload)
      return true
    } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
    }
});

export const createPo = createAsyncThunk(
  'po/createPo', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/po_header`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});


export const approvePO = createAsyncThunk(
  'po/approvePO', 
  async (initialPost) => {
    const { header_id, ...rest } = initialPost
  try {
      const response = await api.patch(`/items/po_header/${header_id}`, {...rest})
      return true
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updatePo = createAsyncThunk(
  'po/updatePo', 
  async (initialPost) => {
  const { po_header_id } = initialPost;
  try {
      const response = await axios.patch(`/items/po_header/${po_header_id}`, initialPost, {
      headers: {
        Authorization: `Bearer ${REACT_APP_DIRECTUS_TOKEN}`,
      }})
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

export const deletePo = createAsyncThunk(
  'po/deletePo', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/po_header/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});

export const clearPo = createAsyncThunk(
  'po/clearPo', 
  async (initialPost) => {
    return true
});



//Initial State
const initialState = {
  data: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
  loadingApprovePO:'idle',
  errorApprovePO:null
}

export const poSlice = createSlice({
  name: "po",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clearPo.fulfilled, (state, action) => {
      state.status = 'idle'
      state.error = null
  });
    /* GET */
    builder.addCase(getPo.pending, (state) => {
    });
    builder.addCase(getPo.fulfilled, (state, action) => {
        state.data = action.payload;
    });
    builder.addCase(getPo.rejected, (state, action) => {
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createPo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createPo.fulfilled, (state, action) => {
      state.status = 'success';
      // state.data = action.payload;
    });
    builder.addCase(createPo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updatePo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updatePo.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.po_number) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const pos = state.data.filter(post => post.po_header_id !== id);
        state.data = [...pos, action.payload];
    });
    builder.addCase(updatePo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deletePo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deletePo.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.po_header_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const pos = state.posts.filter(post => post.po_header_id !== id);
      state.data = pos;
    });
    builder.addCase(deletePo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* CREATE */
    builder.addCase(approvePO.pending, (state) => {
      state.loadingApprovePO = 'loading';
    });
    builder.addCase(approvePO.fulfilled, (state, action) => {
      state.loadingApprovePO = 'success';
      // state.data = action.payload;
    });
    builder.addCase(approvePO.rejected, (state, action) => {
      state.loadingApprovePO = 'failed';
      state.errorApprovePO = null
    });
    
  },
});

export const selectPos = (state) => state.po;
export const selectPoId = (state, id) => state.po.data.find(post => post.po_header_id === id);


export default poSlice.reducer;