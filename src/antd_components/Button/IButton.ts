export interface IButton {
  color?: string;
  backgroundcolor?: string;
  width?: number;
  height?: number;
  margin?: number;
  children: JSX.Element | string;
  onClick: () => void;
}
