export interface ISwitches {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => Promise<void>;
}
