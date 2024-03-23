import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import { IAwnser } from 'templates/discordleTemplates/game/IGame';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';

export interface IMessageTabs {
  activeTabKey: number;
  choosedMessages: IChoosedMessage[];
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

export interface IConfigurationModal {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setStillOpen: React.Dispatch<
    React.SetStateAction<{
      tooltip: boolean;
      popconfirm: boolean;
      dropdown: boolean;
    }>
  >;
}
