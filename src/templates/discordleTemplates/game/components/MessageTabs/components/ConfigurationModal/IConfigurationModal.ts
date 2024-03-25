import { ISwitchValues } from '../../IMessageTabs';
import { SwitchNameEnum } from '../ConfigurationSwitches/switchNameEnum';

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
  channelId: string;
}

export interface IChangeSwitchRequest {
  checked: boolean;
  switch: SwitchNameEnum;
  guildId: string;
  channelId: string;
}
