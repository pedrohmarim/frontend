import { IAwnser } from 'templates/discordleTemplates/game/IGame';

export interface IMessageInstance {
  Messages: IMessage[];
  Authors: IAuthor[];
  ChannelId: string;
  GuildId: string;
  ServerName: string;
  ServerIcon: string;
}

export interface IGetDiscordHintsResponse {
  previousPosition: IMessage;
  consecutivePosition: IMessage;
}

export interface IMessage {
  Id: string;
  Author: IAuthor;
  Content: string;
  Mentions: IMention[];
  Attachments: IAttachments[];
  Sticker_Items: [];
  Timestamp: string;
}

export interface IAttachments {
  url: string;
}

export interface IAuthor {
  Id: string;
  Username: string;
  Avatar: string;
}

export interface IMention {
  username: string;
  id: string;
}

export interface IScoreInstance {
  Score: IPostSaveScore;
  ChannelId: string;
  GuildId: string;
}

export interface IPostSaveScore {
  Awnser: IAwnser;
  UserId: string;
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
