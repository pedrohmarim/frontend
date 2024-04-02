import { IInstanceChannels } from 'services/DiscordleService/IDiscordleService';

export interface ISelectChannelInstanceModal {
  open: boolean;
  selectedGuildName: string | null;
  guildId: string;
  instanceChannels: IInstanceChannels[];
  onClose: () => void;
  setInstanceChannels: React.Dispatch<
    React.SetStateAction<IInstanceChannels[]>
  >;
}

export interface IShowInputsState {
  [key: string]: boolean;
}

export interface IFormValues {
  channelId: string;
  channelCode: string;
}
