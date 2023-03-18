import { FilterMessageEnum, MessageLevelEnum } from 'helpers/filterMessageEnum';

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
