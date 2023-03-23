import { ButtonType, ButtonHTMLType } from 'antd/lib/button';

export interface IButton {
  color?: string;
  backgroundcolor?: string;
  width?: number;
  height?: number;
  boxshadow?: string;
  margin?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  htmlType?: ButtonHTMLType;
}
