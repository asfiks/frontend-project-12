import React, { createContext, useState, useEffect } from 'react';
import socket from '../socket.js';


export const ApiContext = createContext();
export const ApiProvider = ({ children }) => {
  //const [token, setToken] = useState();
  //const [errorAuth, setErrorAuth] = useState();
  const getNewMessage = (newMessage) => {
    socket.emit('newMessage', newMessage, () => {
        try {
            socket.on('newMessage', (response) => {
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