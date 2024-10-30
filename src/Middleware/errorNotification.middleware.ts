import { Notification } from 'antd_components';
import baseService from '../services/api';

import {
  deleteDiscordleToken,
  deleteUser,
  getDiscordleToken,
  getItem,
  getUserToken,
} from 'utils/localStorage/User';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

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

function RedirectLogin() {
  deleteUser();
  deleteDiscordleToken();

  // alert(description);

  if (typeof window !== 'undefined') {
    if (window.location.pathname.includes('discordle')) {
      const guildId = window.location.search
        .replace('?', '')
        .split('&')[0]
        .split('=')[1];

      const channelId = window.location.search
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

let isRehydrating = false;

async function rehydrateToken(token: string) {
  isRehydrating = true;

  const http = baseService();
  const baseUrl = 'DiscordleMembers';

  const response: AxiosResponse<string> = await http.get(
    `${baseUrl}/ReyhdrateDiscordleMemberToken`,
    {
      params: {
        token: token,
      },
    }
  );
  return response.data;
}

export const requestInterceptor = async (
  requestConfig: InternalAxiosRequestConfig
) => {
  const token = getUserToken();
  const discordleToken = getDiscordleToken();

  if (token) {
    const Authorization = `Bearer ${token}`;
    requestConfig.headers['Authorization'] = Authorization as string;
  }

  if (discordleToken) {
    if (!isRehydrating) {
      try {
        const newToken = await rehydrateToken(discordleToken);

        if (newToken) {
          window.localStorage.setItem('discordleToken', newToken);
          requestConfig.headers[
            'Authorization'
          ] = `Bearer discordle ${newToken}`;
        } else {
          requestConfig.headers[
            'Authorization'
          ] = `Bearer discordle ${discordleToken}`;
        }
      } catch {}
    } else {
      requestConfig.headers[
        'Authorization'
      ] = `Bearer discordle ${discordleToken}`;
    }
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

export const errorResponseInterceptor = async (
  error: AxiosError<{
    Message: string;
    error_description: string;
    Status: number;
  }>
) => {
  activeRequests--;
  DisableLoading();

  let description =
    error.response?.data.Message ??
    error.response?.data.error_description ??
    'Não foi possível conectar-se ao servidor.';

  const statusCode = error.response?.status ?? error.response?.data.Status;

  const language = getItem('i18nextLng');

  if (language === 'en') description = await translateToEnglish(description);

  if (
    statusCode === 401 ||
    description.includes('Não autorizado') ||
    description.includes('Not authorized')
  ) {
    RedirectLogin();
  } else
    Notification.error(language === 'en' ? 'Error!' : 'Erro!', description);

  return Promise.reject(error);
};

async function translateToEnglish(text: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=pt|en`;

  try {
    const response = await axios.get(url);
    return response.data.responseData.translatedText;
  } catch (error) {
    return text;
  }
}
