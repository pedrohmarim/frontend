import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';
import {
  IAnswer,
  ISwitchValues,
} from 'templates/discordleTemplates/game/IGame';

export interface IMessageTabs {
  activeTabKey: number;
  choosedMessages: IChoosedMessage[];
  answers: IAnswer[];
  serverName: string;
  usedHint: boolean;
  openWarnExistsHint: boolean;
  authors: IAuthor[];
  serverIcon: string;
  switchValues: ISwitchValues | undefined;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setWarnExistsHint: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchValues: React.Dispatch<
    React.SetStateAction<ISwitchValues | undefined>
  >;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  saveScore: (
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) => void;
}
