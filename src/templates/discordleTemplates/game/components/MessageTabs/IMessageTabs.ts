import { IFilterMessageResponse } from 'helpers/discordle/filterMessageEnum';
import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import { IAwnser } from 'templates/discordleTemplates/game/IGame';

export interface IMessageTabs {
  activeTabKey: number;
  choosedMessages: IFilterMessageResponse[];
  awnsers: IAwnser[];
  serverName: string;
  usedHint: boolean;
  authors: IAuthor[];
  serverIcon: string;
  saveScore: (
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) => void;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
}
