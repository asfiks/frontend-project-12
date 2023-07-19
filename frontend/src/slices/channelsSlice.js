import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../routes/api'

export const fetchData = createAsyncThunk(
  'fetchData',
  async (token) => {
    const response = await axios.get(api.dataPath(), 
      { headers: { Authorization: `Bearer ${token}` }});
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ loadingStatus: 'idle', error: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setAll(state, channels);
        state.currentChannelId = currentChannelId;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addChannel, addChannels } = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const selectorCurrentChannel = channelsAdapter.getSelectors((state) => state.channels.currentChannelId);
export default channelsSlice.reducer;