import { ReactNode } from 'react';
import { ILoggedUser } from 'services/Login/ILoginService';

export interface IContextProps {
  loggedUser: ILoggedUser | null;
  updateLoggedUser: (token: string) => void;
  setLoggedUser: React.Dispatch<React.SetStateAction<ILoggedUser | null>>;
}

export interface IContextProviderProps {
  children: ReactNode;
}
