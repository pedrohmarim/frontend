import {
  FilterMessageEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';

export interface IChoosedMessageComponent {
  score: number;
  message: IChoosedMessage;
  serverName: string;
  authorSelected: string;
  usedHint: boolean;
  tabkey: number;
  serverIcon: string;
  setUsedHint: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IChoosedMessage {
  id: string;
  urlLink: string;
  content: string;
  timestamp: string;
  messageType: FilterMessageEnum;
  messageLevel: MessageLevelEnum;
  formattedAttachs: JSX.Element[];
}

export interface ILinkContainer {
  content: string;
  urlLink: string;
}
