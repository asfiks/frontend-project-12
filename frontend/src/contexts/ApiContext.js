import React, { createContext, useState, useEffect } from 'react';
import { socket } from '../socket.js';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import { addChannel, setCurrentChannelId, updateChannel } from '../slices/channelsSlice';


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
    });
  };

const getAddNewChannelFromServer = (newChannel) => {
  socket.emit('newChannel', newChannel, (response) => {
    if (response.status !== 'ok') {
      throw new Error('channel adding failed');
    }
  });

  socket.on('newChannel', (response) => {
    dispatch(addChannel(response))
    dispatch(setCurrentChannelId(response.id))
    });
  };

const getRenamedChannelFromServer = (channel) => {
  console.log(channel)
  socket.emit('renameChannel', channel , (response) => {
    if (response.status !== 'ok') {
      throw new Error('channel adding failed');
    }
  });

  socket.on('renameChannel', ({ id, name }) => {
    dispatch(updateChannel({ id, name }))
    //dispatch(setCurrentChannelId(response.id))
    });
  };

  return (
    <ApiContext.Provider value={{ getNewMessage, getAddNewChannelFromServer, getRenamedChannelFromServer }}>
      {children}
    </ApiContext.Provider>
  );
};