import { Notification } from 'antd_components';
import Swal from 'sweetalert2';
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

let redirectPromise: Promise<void> | null = null;

function RedirectLogin(description: string) {
  deleteUser();
  deleteDiscordleToken();

  if (!redirectPromise) {
    redirectPromise = new Promise<void>((resolve) => {
      Swal.fire({
        icon: 'error',
        title: 'Não autorizado!',
        text: description ?? 'Sua sessão expirou, realize o login novamente.',
        confirmButtonText: 'OK',
        allowOutsideClick: true,
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          if (typeof window !== 'undefined') {
            if (window.location.pathname.includes('discordle')) {
              const params = new URLSearchParams(window.location.search);

              const guildId = params.get('guildId');
              const channelId = params.get('channelId');
              const code = params.get('code');

              const backRoute = encodeURIComponent(window.location.href);

              window.location.href = `/discordle/chooseProfile?channelId=${channelId}&guildId=${guildId}&code=${code}&backRoute=${backRoute}`;
            } else {
              window.location.href = '/login';
            }
          }
        }
        resolve();
        redirectPromise = null;
      });
    });
  }

  return redirectPromise;
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
    const isOnChooseProfile = window.location.href.includes('chooseProfile');

    if (!isRehydrating && !isOnChooseProfile) {
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

  const isUnauthorized =
    statusCode === 401 ||
    description.includes('Não autorizado') ||
    description.includes('Not authorized');

  const fromReyhdrateToken = error.request.responseURL.includes(
    'ReyhdrateDiscordleMemberToken'
  );

  const isOnChooseProfile = window.location.href.includes('chooseProfile');

  if (isUnauthorized && !fromReyhdrateToken && !isOnChooseProfile) {
    RedirectLogin(description);
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
