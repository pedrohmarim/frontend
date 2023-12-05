import React, { createContext, useContext, ReactNode, useState } from 'react';
import { ILoggedUser } from 'services/Login/ILoginService';

interface MyContextProps {
  loggedUser: ILoggedUser | null;
  updateLoggedUser: (loggedUser: ILoggedUser) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<ILoggedUser>({} as ILoggedUser);

  const updateLoggedUser = (loggedUser: ILoggedUser) => {
    setLoggedUser(loggedUser);
  };

  return (
    <MyContext.Provider value={{ loggedUser, updateLoggedUser }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextProps => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
