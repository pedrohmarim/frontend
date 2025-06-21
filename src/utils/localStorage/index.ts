export const getDiscordleToken = () => {
  if (typeof window === 'undefined') return;

  const discordleToken: string = localStorage.getItem('discordleToken') || '';

  return discordleToken;
};

export const deleteDiscordleToken = () => {
  localStorage.removeItem('discordleToken');
};

export const getItem = (item: string) => {
  if (typeof window === 'undefined') return;

  return localStorage.getItem(item);
};
