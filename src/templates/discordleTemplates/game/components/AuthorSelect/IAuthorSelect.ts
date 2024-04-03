import { IAuthor } from 'services/DiscordleService/IDiscordleService';

export interface IAuthorSelect {
  messageId: string;
  authors: IAuthor[];
  usedHint: boolean;
  activeTabKey: number;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  setAuthorSelected: React.Dispatch<React.SetStateAction<string>>;
  saveScore: (
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) => void;
}
