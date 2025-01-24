export interface IWebSocketMessage {
  IsBroadCast: boolean;
  GuildId: string;
  ChannelId: string;
  Code: string;
  TriggerGetChoosedMessages: boolean;
  InstanceNotCreatedYet: boolean;
  ReloadHomeGuildList: boolean;
  ReloadAuthors: boolean;
}
