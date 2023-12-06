import { Notification } from 'antd_components';
import { getUser } from 'utils/localStorage/User';
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

function RedirectLogin() {
  window.localStorage.removeItem('login');

  if (typeof window !== 'undefined') window.location.href = '/login';
}

export const responseInterceptor = (responseConfig: AxiosResponse) => {
  DisableLoading();
  return responseConfig;
};

export const requestInterceptor = (
  requestConfig: InternalAxiosRequestConfig
) => {
  const user = getUser();

  if (user?.Token) {
    const Authorization = `Bearer ${user?.Token}`;

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

export const errorResponseInterceptor = (error: AxiosError) => {
  DisableLoading();

  const description = error.response?.data ?? 'Erro inesperado';
  const statusCode = error.response?.status ?? '';

  switch (statusCode) {
    case 401:
      RedirectLogin();
      break;
    default:
      break;
  }

  Notification.error({
    message: 'Erro!',
    description: `(${statusCode}) - ${description}`,
    duration: 2,
  });

  return Promise.reject(error);
};
