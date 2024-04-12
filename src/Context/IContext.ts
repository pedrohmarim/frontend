import { ReactNode } from 'react';
import { IGetUserByTokenResponse } from 'services/Login/ILoginService';

export interface IContextProps {
  login: IGetUserByTokenResponse | null;
  serverInfos: {
    ServerName: string;
    ServerIcon: string;
  };
  windowWidth: number;
  updateLogin: (token: string) => void;
  setLogin: React.Dispatch<
    React.SetStateAction<IGetUserByTokenResponse | null>
  >;
}

export interface IContextProviderProps {
  children: ReactNode;
}
