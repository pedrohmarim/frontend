export interface ICreateAccountRequest {
  Username: string;
  Email: string;
  Password: string;
}

export interface IAccountResponse {
  Id: number;
}
//teste
export interface IValidateEmailResponse {
  Message: string;
  IsValid: boolean;
}
