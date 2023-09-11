import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../config';
import { isLoggedIn } from './authhelper';

export let socket: Socket;
export const initiateSocketConnection = () => {
  const user = isLoggedIn();

  socket = io('http://localhost:4000/', {
    auth: {
      token: user && user.token,
    },
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
