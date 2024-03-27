import { IInstanceChannels } from 'services/DiscordleService/IDiscordleService';

export interface IFormDiscordleInstance {
  width: number;
  instanceChannels: IInstanceChannels[];
  handleReload(): void;
}
