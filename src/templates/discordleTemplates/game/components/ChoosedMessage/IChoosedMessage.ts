import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import { ISwitchValues } from '../../IGame';
import {
  MessageTypeEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';

export interface IChoosedMessageComponent {
  score: number;
  switchValues: ISwitchValues | undefined;
  message: IChoosedMessage;
  authorSelected: string;
  usedHint: boolean;
  openWarnExistsHint: boolean;
  tabkey: number;
  setWarnExistsHint: React.Dispatch<React.SetStateAction<boolean>>;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IChoosedMessage {
  id: string;
  urlLink: string;
  content: string;
  timestamp: string;
  messageType: MessageTypeEnum;
  messageLevel?: MessageLevelEnum;
  formattedAttachs: JSX.Element[];
  referencedMessage?: string;
  author?: IAuthor;
  switchValues?: ISwitchValues | undefined;
  fromResult?: boolean;
}
