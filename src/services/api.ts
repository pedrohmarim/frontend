import axios, { AxiosInstance } from 'axios';
import { errorRequestInterceptor } from 'Middleware/interceptors/errorRequestInterceptor';
import { errorResponseInterceptor } from 'Middleware/interceptors/errorResponseInterceptor';
import { requestInterceptor } from 'Middleware/interceptors/requestInterceptor';
import { responseInterceptor } from 'Middleware/interceptors/responseInterceptor';

export default function BaseService(
  contentType = 'application/json'
): AxiosInstance {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    timeout: 5 * 60 * 1000,
    headers: {
      'Content-type': contentType,
    },
  });

  api.interceptors.request.use(requestInterceptor, errorRequestInterceptor);
  api.interceptors.response.use(responseInterceptor, errorResponseInterceptor);

  return api;
}
