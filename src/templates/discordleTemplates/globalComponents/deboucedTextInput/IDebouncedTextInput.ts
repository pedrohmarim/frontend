import type { SizeType } from 'antd/es/config-provider/SizeContext';

export interface IDebouncedTextInput {
  defaultValue?: string | string[] | undefined;
  placeholder?: string;
  handleDebounce: (value: string) => Promise<void>;
  suffix?: React.ReactNode;
  autoFocus?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  size: SizeType;
}
