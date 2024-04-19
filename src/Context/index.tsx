import React, { createContext, useContext, useState, useEffect } from 'react';
import { IGetUserByTokenResponse } from 'services/Login/ILoginService';
import * as I from './IContext';
import { useRouter } from 'next/router';
import LoginApi from 'services/Login/';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import DiscordMemberApi from 'services/DiscordleService/DiscordleMembers';
import DiscordleInstaceApi from 'services/DiscordleService/DiscordleInstance';
import { ISwitchValues } from 'templates/discordleTemplates/game/IGame';
import DiscordleGameAPI from 'services/DiscordleService/DiscordleGame';
import {
  IInstanceChannels,
  ISessionUser,
} from 'services/DiscordleService/IDiscordleService';

const MyContext = createContext<I.IContextProps | undefined>(undefined);

export const ContextProvider: React.FC<I.IContextProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [login, setLogin] = useState<IGetUserByTokenResponse | null>(null);
  const [sessionUser, setSessionUser] = useState<ISessionUser | null>(null);
  const [guildInfoLoading, setGuildInfoLoading] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [serverInfos, setServerInfos] = useState<{
    ServerName: string;
    ServerIcon: string;
  }>({} as { ServerName: string; ServerIcon: string });
  const [switchValues, setSwitchValues] = useState<ISwitchValues>(
    {} as ISwitchValues
  );
  const [instanceChannels, setInstanceChannels] = useState<IInstanceChannels[]>(
    []
  );

  function updateLogin(token: string) {
    LoginApi.GetUserByToken(token).then((login) => {
      setLogin(login);
      window.localStorage.setItem('login', JSON.stringify(login));
    });
  }

  useEffect(() => {
    const login = window.localStorage.getItem('login') ?? '';

    if (login !== 'null' && login !== '')
      setLogin(JSON.parse(login) as IGetUserByTokenResponse);
  }, []);

  const [windowWidth, setWindowWidth] = useState<number>(1920);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const { guildId, channelId, code } = router.query;

      if (guildId && channelId && code) {
        DiscordGameApi.GetGuildInfo(
          guildId.toString(),
          channelId.toString(),
          code.toString()
        )
          .then(({ ServerIcon, ServerName }) => {
            setServerInfos({
              ServerIcon,
              ServerName,
            });

            if (!window.location.pathname.includes('/discordle/chooseProfile'))
              DiscordMemberApi.GetUserByToken(
                guildId.toString(),
                channelId.toString(),
                code.toString()
              ).then((data) => setSessionUser(data));
          })
          .then(() => {
            if (!window.location.pathname.includes('/discordle/chooseProfile'))
              DiscordleGameAPI.VerifyIfIsDiscordleOwner(
                guildId.toString()
              ).then((isOwner) => {
                setIsOwner(isOwner);

                DiscordleInstaceApi.GetSwitchDiscordleInstance({
                  code: code.toString(),
                  guildId: guildId.toString(),
                  channelId: channelId.toString(),
                }).then((data) => {
                  setSwitchValues(data);
                });
              });
          })
          .then(() => setGuildInfoLoading(false));
      }
    }
  }, [router]);

  return (
    <MyContext.Provider
      value={{
        login,
        isOwner,
        windowWidth,
        sessionUser,
        serverInfos,
        switchValues,
        guildInfoLoading,
        instanceChannels,
        setLogin,
        updateLogin,
        setSessionUser,
        setSwitchValues,
        setInstanceChannels,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): I.IContextProps => {
  const context = useContext(MyContext);
  if (!context)
    throw new Error('useMyContext must be used within a MyContextProvider');

  return context;
};
