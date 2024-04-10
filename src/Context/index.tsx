import React, { createContext, useContext, useState, useEffect } from 'react';
import { IGetUserByTokenResponse } from 'services/Login/ILoginService';
import * as I from './IContext';
import LoginApi from 'services/Login/';

const MyContext = createContext<I.IContextProps | undefined>(undefined);

export const ContextProvider: React.FC<I.IContextProviderProps> = ({
  children,
}) => {
  const [login, setLogin] = useState<IGetUserByTokenResponse | null>(null);

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

  return (
    <MyContext.Provider value={{ login, updateLogin, setLogin, windowWidth }}>
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
