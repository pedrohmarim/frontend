import React, { createContext, useContext, useState, useEffect } from 'react';
import { IGetUserByTokenResponse } from 'services/Login/ILoginService';
import * as I from './IContext';
import { useRouter } from 'next/router';
import LoginApi from 'services/Login/';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import DiscordMemberApi from 'services/DiscordleService/DiscordleMembers';
import { ISessionUser } from 'services/DiscordleService/IDiscordleService';

const MyContext = createContext<I.IContextProps | undefined>(undefined);

export const ContextProvider: React.FC<I.IContextProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [login, setLogin] = useState<IGetUserByTokenResponse | null>(null);
  const [sessionUser, setSessionUser] = useState<ISessionUser | null>(null);
  const [serverInfos, setServerInfos] = useState<{
    ServerName: string;
    ServerIcon: string;
  }>({} as { ServerName: string; ServerIcon: string });

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
        ).then(({ ServerIcon, ServerName }) => {
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
        });
      }
    }
  }, [router]);

  return (
    <MyContext.Provider
      value={{
        windowWidth,
        sessionUser,
        serverInfos,
        login,
        setLogin,
        updateLogin,
        setSessionUser,
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
