export interface IFormValues {
  channelId: string;
  channelCode: string;
  showDiscordOnHome: boolean;
}

export interface IFormCreateDiscordleChannel {
  getChannelsWithoutDiscordleInstance?: boolean;
}
