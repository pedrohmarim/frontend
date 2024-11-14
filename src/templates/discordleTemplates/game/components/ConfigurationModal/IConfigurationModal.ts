export interface IConfigurationModal {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IChangeSwitchGet {
  guildId: string;
  code: string;
  channelId: string;
}
