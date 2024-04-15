import { ReactNode } from 'react';
import { ISessionUser } from 'services/DiscordleService/IDiscordleService';
import { IGetUserByTokenResponse } from 'services/Login/ILoginService';

export interface IContextProps {
  login: IGetUserByTokenResponse | null;
  serverInfos: {
    ServerName: string;
    ServerIcon: string;
  };
  windowWidth: number;
  sessionUser: ISessionUser | null;
  updateLogin: (token: string) => void;
  setSessionUser: React.Dispatch<React.SetStateAction<ISessionUser | null>>;
  setLogin: React.Dispatch<
    React.SetStateAction<IGetUserByTokenResponse | null>
  >;
}

export interface IContextProviderProps {
  children: ReactNode;
}
