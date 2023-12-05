import React, { createContext, useContext, useState } from 'react';
import { ILoggedUser } from 'services/Login/ILoginService';
import * as I from './IContext';
import LoginApi from 'services/Login/';

const MyContext = createContext<I.IContextProps | undefined>(undefined);

export const ContextProvider: React.FC<I.IContextProviderProps> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<ILoggedUser | null>(null);

  function updateLoggedUser(token: string) {
    LoginApi.GetUserByToken(token).then((loggedUser) =>
      setLoggedUser(loggedUser)
    );
  }

  return (
    <MyContext.Provider value={{ loggedUser, updateLoggedUser, setLoggedUser }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): I.IContextProps => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
