export interface IHeader {
  current?: string;
  isHome?: boolean;
  windowWidth?: number;
  setCurrent?: React.Dispatch<React.SetStateAction<string>>;
  setAnimationActive?: React.Dispatch<React.SetStateAction<boolean>>;
}
