import { IMessage } from 'services/DiscordleService/IDiscordleService';

export enum MessageTypeEnum {
  isText = 1,
  isLink = 3,
  isImage = 4,
  isImageWithText = 5,
  isImageWithTextAndLink = 6,
  isImageWithLink = 7,
  isEmbed = 8,
  isReferencedMessage = 9,
}

export enum MessageLevelEnum {
  isPrevious = 1,
  isConsecutive = 2,
  isMain = 3,
}

export interface IFilterMessageResponse {
  message: IMessage;
  messageType: MessageTypeEnum;
  urlLink: string;
  formattedAttachs: JSX.Element[];
}
