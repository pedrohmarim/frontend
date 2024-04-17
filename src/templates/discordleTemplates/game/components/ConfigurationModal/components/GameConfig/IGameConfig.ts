import { StaticImageData } from 'next/image';
import { SwitchNameEnum } from './switchNameEnum';

export interface IChangeSwitchRequest {
  value: boolean | number;
  switch: SwitchNameEnum;
  guildId: string;
  channelId: string;
}

export interface ISwitches {
  label: string;
  img?: StaticImageData;
  type: SwitchNameEnum;
  value: number;
  loading?: boolean;
  onChange: (value: number) => Promise<void>;
}
