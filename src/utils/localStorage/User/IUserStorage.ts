import { IAccountResponse } from 'services/Account/IAccountService';
import { IUser } from 'services/Login/ILoginService';

export interface IUserStorage {
  Token: string;
  User: IUser;
  UserAccount: IAccountResponse;
}
