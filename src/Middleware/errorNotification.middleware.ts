import { Notification } from 'antd_components';

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
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedUser');
    window.location.href = '/login';
  }
}

export const responseInterceptor = (responseConfig: AxiosResponse) => {
  DisableLoading();
  return responseConfig;
};

export const requestInterceptor = (
  requestConfig: InternalAxiosRequestConfig
) => {
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

  Notification.error({
    message: 'Erro!',
    description: `(${statusCode}) - ${description}`,
  });

  switch (statusCode) {
    case 401:
      RedirectLogin();
      break;

    default:
      break;
  }

  return Promise.reject(error);
};
