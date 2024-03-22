import axios, { AxiosInstance } from 'axios';
import {
  errorRequestInterceptor,
  errorResponseInterceptor,
  requestInterceptor,
  responseInterceptor,
} from 'Middleware/errorNotification.middleware';

export default function BaseService(
  contentType = 'application/json'
): AxiosInstance {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      'Content-type': contentType,
    },
    timeout: 5 * 60 * 1000,
  });

  api.interceptors.request.use(requestInterceptor, errorRequestInterceptor);

  api.interceptors.response.use(responseInterceptor, errorResponseInterceptor);

  return api;
}
