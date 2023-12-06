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

  return (
    <MyContext.Provider value={{ login, updateLogin, setLogin }}>
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
