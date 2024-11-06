export interface ITermsOfUse {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IDescriptions {
  label: string;
  value: string;
}
