import { ReactNode } from 'react';
import { IGetUserByTokenResponse } from 'services/Login/ILoginService';

export interface IContextProps {
  login: IGetUserByTokenResponse | null;
  updateLogin: (token: string) => void;
  setLogin: React.Dispatch<
    React.SetStateAction<IGetUserByTokenResponse | null>
  >;
}

export interface IContextProviderProps {
  children: ReactNode;
}
