export interface ISelectChannelInstanceModal {
  open: boolean;
  title: string;
  guildId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ShowInputsState {
  [key: string]: boolean;
}
