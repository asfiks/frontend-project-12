import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChannels } from '../slices/channelsSlice.js';
import { AuthContext } from '../contexts/AuthContext';
import  fetchData  from '../slices/fetchThunk.js';



export const HomePage = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.value)
  useEffect(() => {
    dispatch(fetchData(token)).then((data) => {
      dispatch(addChannels(data.payload));
      
    });
  }, [dispatch, token]);  
  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100">
        <h1 /* className="d-flex justify-content-center align-items-center vh-100" */>test</h1>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => console.log(channels.payload)}
        >
          Прибавить
        </button>
        <span></span>
        </div>
    </div>
  )
}
