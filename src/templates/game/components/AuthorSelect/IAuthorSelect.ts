import { IAwnser } from 'templates/game/IGame';

export interface IAuthorSelect {
  authorMessage: string;
  authorsOptions: string[];
  activeTabKey: number;
  usedHint: boolean;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  setAwnsers: React.Dispatch<React.SetStateAction<IAwnser[]>>;
}
