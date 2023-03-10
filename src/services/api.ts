import axios, { AxiosInstance } from 'axios';

export default function baseService(
  contentType = 'application/json'
): AxiosInstance {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      'Content-type': contentType,
    },
    timeout: 120000,
  });

  return api;
}
