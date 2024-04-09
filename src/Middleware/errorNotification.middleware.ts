import { Notification } from 'antd_components';
import {
  deleteDiscordleToken,
  deleteUser,
  getDiscordleToken,
  getUserToken,
} from 'utils/localStorage/User';
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
  deleteUser();
  deleteDiscordleToken();

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

      const code = window.location.search
        .replace('?', '')
        .split('&')[2]
        .split('=')[1];

      const backRoute = encodeURIComponent(window.location.href);

      window.location.href = `/discordle/chooseProfile?channelId=${channelId}&guildId=${guildId}&code=${code}&backRoute=${backRoute}`;
    } else window.location.href = '/login';
  }
}

let activeRequests = 0;

export const responseInterceptor = (responseConfig: AxiosResponse) => {
  activeRequests--;

  if (activeRequests === 0) DisableLoading();

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

  activeRequests++;

  ActiveLoading();

  return requestConfig;
};

export const errorRequestInterceptor = (errorRequest: unknown) => {
  activeRequests--;
  DisableLoading();
  return Promise.reject(errorRequest);
};

export const errorResponseInterceptor = (
  error: AxiosError<{
    Message: string;
    error_description: string;
    Status: number;
  }>
) => {
  activeRequests--;
  DisableLoading();

  const description =
    error.response?.data.Message ??
    error.response?.data.error_description ??
    'Não foi possível conectar-se ao servidor.';

  const statusCode = error.response?.status ?? error.response?.data.Status;

  if (statusCode === 401 || description.includes('Não autorizado'))
    RedirectLogin(description);
  else Notification.error('Erro!', description);

  return Promise.reject(error);
};
