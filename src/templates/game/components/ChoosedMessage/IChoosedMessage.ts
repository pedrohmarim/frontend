import { FilterMessageEnum, MessageLevelEnum } from 'helpers/filterMessageEnum';

export interface IChoosedMessage {
  id: string;
  content: string;
  timestamp: string;
  messageType: FilterMessageEnum[];
  messageLevel: MessageLevelEnum;
  formattedAttachs: JSX.Element[];
}
