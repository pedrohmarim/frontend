import { FilterMessageEnum } from 'helpers/filterMessageEnum';

export interface IChoosedMessage {
  content: string;
  timestamp: string;
  messageType: FilterMessageEnum;
  formattedAttachs: JSX.Element[];
}
