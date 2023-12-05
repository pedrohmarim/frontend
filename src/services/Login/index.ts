import * as I from './ILoginService';
import baseService from '../api';
import { AxiosResponse } from 'axios';

const baseURL = '/Login';
const http = baseService();

const ApiAuth = {
  Login: async function (data: I.ILoginRequest) {
    const response: AxiosResponse<I.ILoginResponse> = await http.post(
      `${baseURL}`,
      data
    );
    return response.data;
  },
  ValidateToken: async function (token: string) {
    const response: AxiosResponse<boolean> = await http.get(
      `${baseURL}/validateToken`,
      {
        params: { token },
      }
    );
    return response.data;
  },
};

export default ApiAuth;
