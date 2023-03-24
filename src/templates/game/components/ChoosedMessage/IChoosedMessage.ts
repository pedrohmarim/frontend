import { FilterMessageEnum, MessageLevelEnum } from 'helpers/filterMessageEnum';

export interface IChoosedMessageComponent {
  score: number;
  message: IChoosedMessage;
  serverName: string;
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
  authorsOptions: string[];
}

export interface ILinkContainer {
  content: string;
  urlLink: string;
}
