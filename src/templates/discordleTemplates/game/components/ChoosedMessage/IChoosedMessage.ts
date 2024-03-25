import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import { ISwitchValues } from '../MessageTabs/IMessageTabs';
import {
  FilterMessageEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';

export interface IChoosedMessageComponent {
  isOwner: boolean;
  switchValues: ISwitchValues | undefined;
  openModal: boolean;
  score: number;
  message: IChoosedMessage;
  serverName: string;
  authorSelected: string;
  usedHint: boolean;
  tabkey: number;
  serverIcon: string;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IChoosedMessage {
  id: string;
  urlLink: string;
  content: string;
  timestamp: string;
  messageType: FilterMessageEnum;
  messageLevel?: MessageLevelEnum;
  formattedAttachs: JSX.Element[];
  referencedMessage?: string;
  author?: IAuthor;
  switchValues?: ISwitchValues | undefined;
}
