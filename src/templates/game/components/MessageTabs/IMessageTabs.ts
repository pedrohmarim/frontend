import { IFilterMessageResponse } from 'helpers/filterMessageEnum';
import { IAuthor } from 'services/DiscordMessages/IDiscordMessagesService';
import { IAwnser } from 'templates/game/IGame';

export interface IMessageTabs {
  activeTabKey: number;
  choosedMessages: IFilterMessageResponse[];
  awnsers: IAwnser[];
  serverName: string;
  authors: IAuthor[];
  serverIcon: string;
  saveScore: (awnser: IAwnser) => void;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  setAwnsers: React.Dispatch<React.SetStateAction<IAwnser[]>>;
}
