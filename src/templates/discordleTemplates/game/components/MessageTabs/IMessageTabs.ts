import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import {
  IAnswer,
  ISwitchValues,
} from 'templates/discordleTemplates/game/IGame';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';

export interface IMessageTabs {
  activeTabKey: number;
  choosedMessages: IChoosedMessage[];
  answers: IAnswer[];
  serverName: string;
  usedHint: boolean;
  authors: IAuthor[];
  serverIcon: string;
  switchValues: ISwitchValues | undefined;
  setSwitchValues: React.Dispatch<
    React.SetStateAction<ISwitchValues | undefined>
  >;
  saveScore: (
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) => void;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
}
