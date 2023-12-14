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
  Logout: async function () {
    const response: AxiosResponse<I.ILogoutResponse> = await http.get(
      `${baseURL}/logout`
    );
    return response.data;
  },
  GetUserByToken: async function (tokenParam: string) {
    const response: AxiosResponse<I.IGetUserByTokenResponse> = await http.get(
      `${baseURL}/getUserByToken`,
      {
        params: { tokenParam },
      }
    );
    return response.data;
  },
};

export default ApiAuth;
