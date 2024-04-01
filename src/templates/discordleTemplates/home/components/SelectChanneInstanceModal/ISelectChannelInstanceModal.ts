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

export interface ShowInputsState {
  [key: string]: boolean;
}
