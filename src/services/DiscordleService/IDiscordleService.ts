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
  PreviousPosition?: IMessage;
  ConsecutivePosition?: IMessage;
}

export interface IMessage {
  Id: string;
  Content: string;
  Author: IAuthor;
  Attachments: IAttachments[];
  Embeds: IEmbeds[];
  ReferencedMessage: string;
  Timestamp: string;
}

export interface IVideoEmbed {
  Url: string;
  Height: number;
  Width: number;
}

export interface IEmbeds {
  Video: IVideoEmbed;
  Type: string;
}

export interface IAttachments {
  Url: string;
}

export interface IAuthor {
  Id: string;
  Username: string;
  Avatar: string;
}

export interface IDiscordHintsRequest {
  MessageId: string;
  ChannelId: string;
  GuildId: string;
  AuthorSelected: string;
  TabKey: number;
}

export interface IScoreInstance {
  Score: IPostSaveScore;
  ChannelId: string;
  GuildId: string;
}

export interface IPostSaveScore {
  MessageId: string;
  AuthorSelected: string;
  UsedHint: boolean;
  ActiveTabKey: number;
}

export interface IGetQueryParamsByUserIdResponse {
  channelId: string;
  guildId: string;
}

export interface IInstanceChannels {
  ChannelName: string;
  ChannelId: string;
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
