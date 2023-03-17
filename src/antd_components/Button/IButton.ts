import { ButtonType } from 'antd/lib/button';

export interface IButton {
  color?: string;
  backgroundcolor?: string;
  width?: number;
  height?: number;
  margin?: number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
}
