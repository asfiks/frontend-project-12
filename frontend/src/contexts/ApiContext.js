import React, { createContext, useState, useEffect } from 'react';
import { socket } from '../socket.js';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import { addChannel } from '../slices/channelsSlice';


export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();

  const getNewMessage = (newMessage) => {
    socket.emit('newMessage', newMessage, (response) => {
      if (response.status !== 'ok') {
        throw new Error('message delivery failed');
      }
    });

  socket.on('newMessage', (response) => {
    dispatch(addMessage(response))
    console.log(response)
  });

};

const getNewChannel = (newChannel) => {
  socket.emit('newChannel', newChannel, (response) => {
    if (response.status !== 'ok') {
      throw new Error('channel adding failed');
    }
  });

  socket.on('newChannel', (response) => {
    dispatch(addChannel(response))
    console.log(response)
  });

};

  return (
    <ApiContext.Provider value={{ getNewMessage, getNewChannel }}>
      {children}
    </ApiContext.Provider>
  );
};