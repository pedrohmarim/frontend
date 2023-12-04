import * as I from './ILoginService';
import baseService from '../api';
import { AxiosResponse } from 'axios';

const baseURL = '/Login';
const http = baseService();

const ApiAuth = {
  Login: async function (data: I.ILoginRequest) {
    const response: AxiosResponse<boolean> = await http.post(
      `${baseURL}`,
      data
    );
    return response.data;
  },
};

export default ApiAuth;
