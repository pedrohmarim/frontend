import { StaticImageData } from 'next/image';
import { SwitchNameEnum } from './switchNameEnum';

export interface ISwitches {
  label: string;
  img?: StaticImageData;
  type: SwitchNameEnum;
  value: number;
  onChange: (value: number) => Promise<void>;
}
