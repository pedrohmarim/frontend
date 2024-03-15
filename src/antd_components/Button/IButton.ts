import { ButtonType } from 'antd/lib/button';

export interface IButton {
  color?: string;
  backgroundcolor?: string;
  width?: number | string;
  height?: number | string;
  boxshadow?: string;
  margin?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonType;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}
