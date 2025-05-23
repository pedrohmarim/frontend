import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';
import { IAnswer, ISwitchValues } from '../../IGame';

export interface IMessageSteps {
  answers: IAnswer[];
  authors: IAuthor[];
  usedHint: boolean;
  loading: boolean;
  switchValues: ISwitchValues | undefined;
  activeTabKey: number;
  choosedMessages: IChoosedMessage[];
  openWarnExistsHint: boolean;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  setWarnExistsHint: React.Dispatch<React.SetStateAction<boolean>>;
  saveScore: (
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) => Promise<void>;
}
