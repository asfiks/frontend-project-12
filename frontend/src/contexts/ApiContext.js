import React, { createContext, useState, useEffect } from 'react';
import { socket } from '../socket.js';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const getNewMessage = (newMessage) => {
    socket.emit('newMessage', newMessage, () => {
        try {
            socket.on('newMessage', (response) => {
                dispatch(addMessage(response))
                console.log(response)
              });
        } catch(e) {
            console.error(e);
        };
    });
};

  return (
    <ApiContext.Provider value={{ getNewMessage }}>
      {children}
    </ApiContext.Provider>
  );
};