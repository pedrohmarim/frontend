export interface ISendCodeToEmailRequest {
  Email: string;
}

export interface ISendChangePasswordUrlRequest {
  Code: string;
  Email: string;
}

export interface IValidateResetPasswordTokenRequest {
  Token: string;
  SecretKey: string;
}

export interface IResetPasswordRequest {
  Password: string;
  SecretKey: string;
}
