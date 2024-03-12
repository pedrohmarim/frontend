import { IAwnser } from 'templates/discordleTemplates/game/IGame';

export interface IMessageInstance {
  messages: IMessage[];
  authors: IAuthor[];
  channelId: string;
  serverName: string;
  serverIcon: string;
}

export interface IGetDiscordHintsResponse {
  previousPosition: IMessage;
  consecutivePosition: IMessage;
}

export interface IMessage {
  id: string;
  author: IAuthor;
  content: string;
  mentions: IMention[];
  attachments: IAttachments[];
  sticker_items: [];
  timestamp: string;
}

export interface IAttachments {
  url: string;
}

export interface IAuthor {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface IMention {
  username: string;
  id: string;
}

export interface IScoreInstance {
  scores: IPostSaveScore;
  channelId: string;
  guildId: string;
}

export interface IPostSaveScore {
  scoreDetails: IAwnser;
  date: string;
  userId: string;
}

export interface IGetQueryParamsByUserIdResponse {
  channelId: string;
  guildId: string;
}

export interface IInstanceChannelsGetDto {
  _id: string;
  channels: IInstanceChannels[];
}

export interface IInstanceChannels {
  ChannelName: string;
  ChannelId: string;
  Members: IMember[];
  NotListed: boolean;
}

export interface IMember {
  Id: string;
  Username: string;
  AvatarUrl: string;
}

export interface IGetTableResponse {
  channelName: string;
  rankingTableData: IRankingTableData[];
}

export interface IRankingTableData {
  rowId: string;
  position: number;
  member: {
    avatarUrl: string;
    username: string;
    userId: string;
  };
  totalScore: number;
}

export interface IUserScoreDetail {
  scoreDetails: IAwnser[];
  date: string;
  rowId: string;
}
