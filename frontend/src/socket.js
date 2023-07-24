import { io } from 'socket.io-client';

export const socket = io(); 

export const getNewMessages = (newMessage) => {
    socket.emit('newMessage', newMessage, () => {
        try {
            socket.on('newMessage', (response) => {
                //ответ добавляем в стор, правильно же?
              });
        } catch(e) {
            console.error(e);
        };
    });
};