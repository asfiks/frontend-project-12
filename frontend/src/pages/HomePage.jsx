import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannels, } from '../slices/channelsSlice.js';

export const HomePage = () => {
    const channels = useSelector((state) => state.channels.value)
    const dispatch = useDispatch();
    return (
    
    <div className="d-flex justify-content-center align-items-center vh-100">
        <h1 /* className="d-flex justify-content-center align-items-center vh-100" */>test</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(getChannels())}
        >
          Прибавить
        </button>
        <span>{channels}</span>
        </div>
    </div>
  )
}
