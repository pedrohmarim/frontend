import * as I from './IUserStorage';

export const getUserToken = () => {
  if (typeof window === 'undefined') return;

  const user: I.IUserStorage = JSON.parse(
    localStorage.getItem('login') || '{}'
  );

  return user.Token;
};

export const getDiscordleToken = () => {
  if (typeof window === 'undefined') return;

  const discordleToken: string = localStorage.getItem('discordleToken') || '';

  return discordleToken;
};

export const deleteUser = () => {
  localStorage.removeItem('login');
};
