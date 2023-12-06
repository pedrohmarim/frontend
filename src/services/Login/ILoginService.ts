import { IAccountResponse } from 'services/Account/IAccountService';

export interface ILoginRequest {
  Email: string;
  Password: string;
}

export interface IUser {
  Birthday: Date;
  Username: string;
}

export interface ILoginResponse {
  Message: string | null;
  Token: string;
}

export interface IGetUserByTokenResponse {
  Token: string;
  User: IUser;
  Account: IAccountResponse;
}

export interface ILogoutResponse {
  Message: string;
  Success: boolean;
}
