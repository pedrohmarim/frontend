export interface IWebSocketResponse {
  GuildId: string;
  ChannelId: string;
  Code: string;
  TriggerGetChoosedMessages: boolean;
  InstanceNotCreatedYet: boolean;
}
