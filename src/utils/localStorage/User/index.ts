import * as I from './IUserStorage';

export const getUser = () => {
  if (typeof window === 'undefined') return;

  const user: I.IUserStorage = JSON.parse(
    localStorage.getItem('login') || '{}'
  );

  return user;
};

export const deleteUser = () => {
  localStorage.removeItem('login');
};
