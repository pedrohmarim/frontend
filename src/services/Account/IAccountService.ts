export interface ICreateAccountRequest {
  Username: string;
  Email: string;
  Password: string;
}

export interface IValidateEmailResponse {
  Message: string;
  IsValid: boolean;
}
