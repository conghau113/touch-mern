import { initiateSocketConnection } from './socketHelper';

const isLoggedIn = () => {
  return JSON.parse(localStorage.getItem('user') as string);
};

const loginUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
  initiateSocketConnection();
};

const logoutUser = () => {
  localStorage.removeItem('user');
  initiateSocketConnection();
};

export { loginUser, isLoggedIn, logoutUser };
