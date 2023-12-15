import * as I from './IRecoverPasswordService';
import baseService from '../api';
import { AxiosResponse } from 'axios';
import { IGenericResponse } from 'services/IApi';

const baseURL = '/RecoverPassword';
const http = baseService();

const ApiAuth = {
  SendCodeToEmail: async function (data: I.ISendCodeToEmailRequest) {
    const response: AxiosResponse<IGenericResponse> = await http.post(
      `${baseURL}/sendCodeToEmail`,
      data
    );
    return response.data;
  },
  SendChangePasswordUrlToEmail: async function (
    data: I.ISendChangePasswordUrlRequest
  ) {
    const response: AxiosResponse<IGenericResponse> = await http.post(
      `${baseURL}/sendChangePasswordUrlToEmail`,
      data
    );
    return response.data;
  },
  ValidateResetPasswordToken: async function (
    data: I.IValidateResetPasswordTokenRequest
  ) {
    const response: AxiosResponse<IGenericResponse> = await http.post(
      `${baseURL}/validateResetPasswordToken`,
      data
    );
    return response.data;
  },
  ResetPassword: async function (data: I.IResetPasswordRequest) {
    const response: AxiosResponse<IGenericResponse> = await http.post(
      `${baseURL}/resetPassword`,
      data
    );
    return response.data;
  },
};

export default ApiAuth;
