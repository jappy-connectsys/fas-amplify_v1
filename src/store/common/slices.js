import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { axiosInstance } from "../middleware/directus";


export default ({ baseUrl, name, authCode }) => {
  const fetchWithAuth = (url, { headers = {}, ...options } = {}) =>
    fetch (url, {
      ...options,
      headers: {
        ...(authCode && { Authorization: authCode }),
        ...headers
      }
  });

  const handleResponse = async r => {
    const resdata = await r.json();
    if (r.status !== 200) {
      throw new Error(resdata);
    }
    return resdata;
  };

  const fetchByQuery = createAsyncThunk(`${name}/fetchByQueryStatus`, (params) => {
    const querystring = new URLSearchParams(params);
    console.log(querystring);
    fetchWithAuth(`${baseUrl}?${querystring}`).then(handleResponse)
  });

  const fetchById = createAsyncThunk(`${name}/fetchByIdStatus`, id =>
    fetchWithAuth(`${baseUrl}/${id}`).then(handleResponse)
  );

  const fetchAll = createAsyncThunk(`${name}/fetchAllStatus`, () =>
    fetchWithAuth(`${baseUrl}`).then(handleResponse)
  );

  const updateById = createAsyncThunk(
    `${name}/updateByIdStatus`,
    ({ id, data }) =>
      fetchWithAuth(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(handleResponse)
        .then(() => data)
  );

  const deleteById = createAsyncThunk(`${name}/deleteByIdStatus`, id =>
    fetchWithAuth(`${baseUrl}/${id}`, {
      method: "DELETE"
    })
      .then(handleResponse)
      .then(() => id)
  );

  const createNew = createAsyncThunk(`${name}/createNewStatus`, data =>
    fetchWithAuth(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(handleResponse)
      .then(r => ({
        id: r.id,
        ...data
      }))
  );

  const adapter = createEntityAdapter();

  const slice = createSlice({
    name,
    initialState: adapter.getInitialState({
      loading: "idle"
    }),
    reducers: {},
    extraReducers: {
      [fetchById.fulfilled]: adapter.upsertOne,
      [updateById.fulfilled]: adapter.upsertOne,
      [deleteById.fulfilled]: adapter.removeOne,
      [createNew.fulfilled]: adapter.upsertOne,
      [fetchAll.fulfilled]: adapter.upsertMany,
      [fetchByQuery.fulfilled]: adapter.upsertMany,
    }
  });

  return {
    reducer: slice.reducer,
    ...adapter.getSelectors(state => state[name]),
    fetchById,
    fetchAll,
    fetchByQuery,
    updateById,
    deleteById,
    createNew
  };
};


export const users = builder({
  baseUrl: `${REACT_APP_DIRECTUS_URL}/`,
  name: 'users',
});

export const company = builder({
  baseUrl: `${REACT_APP_DIRECTUS_URL}/items`,
  name: 'company',
})

