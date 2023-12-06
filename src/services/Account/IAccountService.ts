export interface ICreateAccountRequest {
  Username: string;
  Email: string;
  Password: string;
}

export interface IAccountResponse {
  Id: number;
}

export interface IValidateEmailResponse {
  Message: string;
  IsValid: boolean;
}
