import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannels, } from '../slices/channelsSlice.js';
import { AuthContext } from '../contexts/AuthContext';



export const HomePage = () => {
  const { token } = useContext(AuthContext);
  console.log(token)
  const channels = useSelector((state) => state.channels.value)
  console.log(channels)
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
