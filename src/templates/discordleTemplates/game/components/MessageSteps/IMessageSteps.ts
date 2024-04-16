import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';
import { IAnswer, ISwitchValues } from '../../IGame';

export interface IMessageSteps {
  openModal: boolean;
  answers: IAnswer[];
  authors: IAuthor[];
  usedHint: boolean;
  loading: boolean;
  saveScore: (
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) => Promise<void>;
  switchValues: ISwitchValues | undefined;
  activeTabKey: number;
  choosedMessages: IChoosedMessage[];
  openWarnExistsHint: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  setWarnExistsHint: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchValues: React.Dispatch<
    React.SetStateAction<ISwitchValues | undefined>
  >;
}
