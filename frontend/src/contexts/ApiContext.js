import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../socket.js';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel, setCurrentChannelId, updateChannel, deleteChannel,
} from '../slices/channelsSlice';

export const ApiContext = createContext();

export function ApiProvider({ children }) {
  const dispatch = useDispatch();

  const getNewMessage = (newMessage) => {
    socket.emit('newMessage', newMessage, (response) => {
      if (response.status !== 'ok') {
        throw new Error('message delivery failed');
      }
    });

    socket.on('newMessage', (response) => {
      dispatch(addMessage(response));
    });
  };

  const getAddNewChannelFromServer = (newChannel) => {
    socket.emit('newChannel', newChannel, (response) => {
      console.log(response);
      if (response.status !== 'ok') {
        throw new Error('channel adding failed');
      }
    });

    socket.on('newChannel', (response) => {
      dispatch(addChannel(response));
      dispatch(setCurrentChannelId(response.id));
    });
  };

  const renamedChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('channel rename failed');
      }
    });

    socket.on('renameChannel', ({ id, name }) => {
      dispatch(updateChannel({ id, changes: { name } }));
    });
  };

  const removeChannel = (channelId) => {
    socket.emit('removeChannel', channelId, (response) => {
      if (response.status !== 'ok') {
        throw new Error('channel removing failed');
      }
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(deleteChannel(id));
    });
  };

  return (
    <ApiContext.Provider value={{
      getNewMessage, getAddNewChannelFromServer, renamedChannel, removeChannel,
    }}
    >
      {children}
    </ApiContext.Provider>
  );
}
