import { IMessage } from 'services/DiscordMessages/IDiscordMessagesService';

export enum FilterMessageEnum {
  isText = 1,
  isMention = 2,
  isLink = 3,
  isImage = 4,
}

export interface IFilterMessageResponse {
  message: IMessage;
  messageType: FilterMessageEnum;
  formattedAttachs: JSX.Element[];
}
