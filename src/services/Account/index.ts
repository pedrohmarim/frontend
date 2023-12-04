import * as I from './IAccountService';
import baseService from '../api';
import { AxiosResponse } from 'axios';

const baseURL = '/Account';
const http = baseService();

const ApiAuth = {
  CreateAccount: async function (data: I.ICreateAccountRequest) {
    const response: AxiosResponse<void> = await http.post(
      `${baseURL}/createAccount`,
      data
    );
    return response.data;
  },
  ValidateEmail: async function (email: string) {
    const response: AxiosResponse<I.IValidateEmailResponse> = await http.get(
      `${baseURL}/getEmailValidated`,
      { params: { email } }
    );
    return response.data;
  },
};

export default ApiAuth;
