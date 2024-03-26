import { IAuthor } from 'services/DiscordleService/IDiscordleService';
import {
  FilterMessageEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';
import { ISwitchValues } from '../../IGame';

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
