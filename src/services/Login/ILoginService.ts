export interface ILoginRequest {
  Email: string;
  Password: string;
}

export interface ILoggedUser {
  Birthday: Date;
  Username: string;
}

export interface ILoginResponse {
  Message: string | null;
  Token: string;
  LoginGetDto: ILoggedUser;
}

export interface ILogoutResponse {
  Message: string;
  Success: boolean;
}
