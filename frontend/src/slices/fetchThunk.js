/* import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../routes/api'
import axios from 'axios';

const fetchData = createAsyncThunk(
  'fetchData',
  async (token) => {
    const response = await axios.get(api.dataPath(), 
      { headers: { Authorization: `Bearer ${token}` }});
    return response.data;
  },
);

export default fetchData; */