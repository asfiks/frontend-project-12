import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { AuthContext } from '../contexts/AuthContext';



// Начальное значение
const initialState = {
  value: {},
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    addChannels: (state, data) => {
      state.value = {...data}
    }
  },
});

export const { addChannels } = channelsSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default channelsSlice.reducer;