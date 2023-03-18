export enum FilterMessageEnum {
  isText = 1,
  isMention = 2,
  isLink = 3,
  isImage = 4,
}

export enum MessageLevelEnum {
  isPrevious = 1,
  isConsecutive = 2,
  isMain = 3,
  dontExist = 4,
}

export interface IFilterMessageResponse {
  messageType: FilterMessageEnum[];
  formattedAttachs: JSX.Element[];
}
