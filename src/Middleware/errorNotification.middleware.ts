import { Notification } from 'antd_components';
import { getDiscordleToken, getUserToken } from 'utils/localStorage/User';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

function ActiveLoading() {
  const loaderElement = document.getElementById('loader');
  if (loaderElement) loaderElement.style.display = 'block';
}

function DisableLoading() {
  setTimeout(() => {
    const loaderElement = document.getElementById('loader');
    if (loaderElement) loaderElement.style.display = 'none';
  }, 1000);
}

function RedirectLogin(description: string) {
  window.localStorage.removeItem('login');
  window.localStorage.removeItem('discordleToken');

  alert(`${description}`);

  if (typeof window !== 'undefined') {
    if (window.location.pathname.includes('discordle')) {
      const channelId = window.location.search
        .replace('?', '')
        .split('&')[0]
        .split('=')[1];
      const guildId = window.location.search
        .replace('?', '')
        .split('&')[1]
        .split('=')[1];

      window.location.href = `/discordle/chooseProfile?channelId=${channelId}&guildId=${guildId}`;
    } else window.location.href = '/login';
  }
}

export const responseInterceptor = (responseConfig: AxiosResponse) => {
  DisableLoading();
  return responseConfig;
};

export const requestInterceptor = (
  requestConfig: InternalAxiosRequestConfig
) => {
  const token = getUserToken();
  const discordleToken = getDiscordleToken();

  if (token) {
    const Authorization = `Bearer ${token}`;

    requestConfig.headers = requestConfig.headers || {};

    requestConfig.headers['Authorization'] = Authorization as string;
  }

  if (discordleToken) {
    const Authorization = `Bearer discordle ${discordleToken}`;

    requestConfig.headers = requestConfig.headers || {};

    requestConfig.headers['Authorization'] = Authorization as string;
  }

  ActiveLoading();
  return requestConfig;
};

export const errorRequestInterceptor = (errorResquest: unknown) => {
  DisableLoading();
  return Promise.reject(errorResquest);
};

export const errorResponseInterceptor = (
  error: AxiosError<{ Message: string; Status: number }>
) => {
  DisableLoading();

  const description =
    error.response?.data.Message ?? 'Não foi possível conectar-se ao servidor.';
  const statusCode = error.response?.status;

  switch (statusCode) {
    case 401:
      RedirectLogin(description);
      break;
    default:
      break;
  }

  if (statusCode !== 401) Notification.error('Erro!', description);

  return Promise.reject(error);
};
