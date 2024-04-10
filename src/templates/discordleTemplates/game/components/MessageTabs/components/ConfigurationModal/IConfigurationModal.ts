import { ISwitchValues } from 'templates/discordleTemplates/game/IGame';
import { SwitchNameEnum } from '../ConfigurationParams/switchNameEnum';

export interface IConfigurationModal {
  openModal: boolean;
  switchValues: ISwitchValues | undefined;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchValues: React.Dispatch<
    React.SetStateAction<ISwitchValues | undefined>
  >;
}

export interface IChangeSwitchGet {
  guildId: string;
  code: string;
  channelId: string;
}

export interface IChangeSwitchRequest {
  value: boolean | number;
  switch: SwitchNameEnum;
  guildId: string;
  channelId: string;
}
