export interface ISelectChannelInstanceModal {
  open: boolean;
  selectedGuildName: string | null;
  guildId: string;
  onClose: () => void;
}

export interface IShowInputsState {
  [key: string]: boolean;
}
