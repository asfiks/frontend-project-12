import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../routes/api';

export const fetchData = createAsyncThunk(
  'fetchData',
  async (token) => {
    const response = await axios.get(
      api.dataPath(),
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data;
  },
);

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({ loadingStatus: 'idle', error: null });

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.setAll(state, messages);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const selectorsMessages = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
