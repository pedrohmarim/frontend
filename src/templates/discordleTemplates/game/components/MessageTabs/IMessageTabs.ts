import { IFilterMessageResponse } from 'helpers/discordle/filterMessageEnum';
import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import { IAwnser } from 'templates/discordleTemplates/game/IGame';

export interface IMessageTabs {
  activeTabKey: number;
  choosedMessages: IFilterMessageResponse[];
  awnsers: IAwnser[];
  serverName: string;
  authors: IAuthor[];
  serverIcon: string;
  saveScore: (
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) => void;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  setAwnsers: React.Dispatch<React.SetStateAction<IAwnser[]>>;
}
