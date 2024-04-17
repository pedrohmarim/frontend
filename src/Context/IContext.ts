import { ReactNode } from 'react';
import { ISessionUser } from 'services/DiscordleService/IDiscordleService';
import { IGetUserByTokenResponse } from 'services/Login/ILoginService';
import { ISwitchValues } from 'templates/discordleTemplates/game/IGame';

export interface IContextProps {
  login: IGetUserByTokenResponse | null;
  switchValues: ISwitchValues;
  windowWidth: number;
  guildInfoLoading: boolean;
  isOwner: boolean;
  sessionUser: ISessionUser | null;
  serverInfos: {
    ServerName: string;
    ServerIcon: string;
  };
  setSwitchValues: React.Dispatch<React.SetStateAction<ISwitchValues>>;
  updateLogin: (token: string) => void;
  setSessionUser: React.Dispatch<React.SetStateAction<ISessionUser | null>>;
  setLogin: React.Dispatch<
    React.SetStateAction<IGetUserByTokenResponse | null>
  >;
}

export interface IContextProviderProps {
  children: ReactNode;
}
