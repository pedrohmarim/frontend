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
  PreviousPosition: IMessage;
  ConsecutivePosition: IMessage;
}

export interface IMessage {
  Id: string;
  Content: string;
  Mentions: IMention[];
  Attachments: IAttachments[];
  Sticker_Items: [];
  Timestamp: string;
}

export interface IAttachments {
  Url: string;
}

export interface IAuthor {
  Id: string;
  Username: string;
  Avatar: string;
}

export interface IMention {
  Username: string;
  Id: string;
}

export interface IScoreInstance {
  Score: IPostSaveScore;
  ChannelId: string;
  GuildId: string;
}

export interface IPostSaveScore {
  UserId: string;
  MessageId: string;
  AuthorSelected: string;
  UsedHint: boolean;
  ActiveTabKey: number;
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
  ChannelName: string;
  RankingTableData: IRankingTableData[];
}

export interface IRankingTableData {
  RowId: string;
  Position: number;
  TotalScore: number;
  Member: {
    AvatarUrl: string;
    Username: string;
    Id: string;
  };
}

export interface IUserScoreDetail {
  ScoreDetails: IAwnser[];
  Date: string;
  RowId: string;
}
