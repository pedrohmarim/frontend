import axios, { AxiosInstance } from 'axios';
import {
  errorRequestInterceptor,
  errorResponseInterceptor,
  requestInterceptor,
  responseInterceptor,
} from 'Middleware/errorNotification.middleware';

export default function baseService(
  contentType = 'application/json',
  token = typeof window !== 'undefined'
    ? window.localStorage.getItem('token')
    : ''
): AxiosInstance {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': contentType,
    },
    timeout: 120000,
  });

  api.interceptors.request.use(requestInterceptor, errorRequestInterceptor);

  api.interceptors.response.use(responseInterceptor, errorResponseInterceptor);

  return api;
}
