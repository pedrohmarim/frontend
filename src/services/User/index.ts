import * as I from './IUserService';
import baseService from '../api';
import { AxiosResponse } from 'axios';

const baseURL = '/User';
const http = baseService();

const ApiAuth = {
  GetUser: async function (data: I.IUserRequest) {
    const response: AxiosResponse<I.IUserResponse> = await http.get(
      `${baseURL}/getUserById`,
      { params: data }
    );
    return response.data;
  },
};

export default ApiAuth;
