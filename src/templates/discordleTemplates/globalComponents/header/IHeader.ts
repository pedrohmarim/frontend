export interface IHeader {
  current?: string;
  isHome?: boolean;
  setCurrent?: React.Dispatch<React.SetStateAction<string>>;
  setAnimationActive?: React.Dispatch<React.SetStateAction<boolean>>;
}
