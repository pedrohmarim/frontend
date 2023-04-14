import { IAwnser } from 'templates/game/IGame';

export interface IAuthorSelect {
  authorMessage: string;
  authors: string[];
  activeTabKey: number;
  usedHint: boolean;
  saveScore: (awnser: IAwnser) => void;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  setAwnsers: React.Dispatch<React.SetStateAction<IAwnser[]>>;
}
