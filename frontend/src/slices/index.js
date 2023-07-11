import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './chanelsReducer.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    }
});