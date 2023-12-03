import * as I from './IUserService';
import baseService from '../api';
import { AxiosResponse } from 'axios';

const baseURL = '/User';
const http = baseService();

const ApiAuth = {
  // GetUser: async function (data: I.IUserRequest) {
  //   const response: AxiosResponse<I.IUserResponse> = await http.get(
  //     `${baseURL}/getById`,
  //     { params: data }
  //   );
  //   return response.data;
  // },
  RegisterUser: async function (data: I.ICreateUserRequest) {
    const response: AxiosResponse<void> = await http.post(
      `${baseURL}/registerUser`,
      data
    );
    return response.data;
  },
  ValidateEmail: async function (email: string) {
    const response: AxiosResponse<I.IValidateEmailResponse> = await http.get(
      `${baseURL}/validateEmail`,
      { params: { email } }
    );
    return response.data;
  },
};

export default ApiAuth;
