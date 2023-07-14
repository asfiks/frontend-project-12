import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { AuthContext } from '../contexts/AuthContext';



// Начальное значение
const initialState = {
  value: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    getChannels: (state) => {
      state.value.push('aaaa ')
    }
  },
});
    /* async () => {
      const data = await axios.get('/api/v1/data', {
        headers: { Authorization: `Bearer ${token}` }
      }
    },
     increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // пример с данными
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }, */ 
// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
export const { getChannels } = channelsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default channelsSlice.reducer;