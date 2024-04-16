import { MenuProps } from 'antd';

export interface IAnswer {
  Score: number;
  Success: boolean;
  Username: string;
  TabKey: number;
  UsedHint: boolean;
}

export interface ISwitchValues {
  ShowHintsAuthors: number;
  ShowReferencedMessage: number;
  PointsPerCorrectAnswer: number;
}

export type MenuItem = Required<MenuProps>['items'][number];
