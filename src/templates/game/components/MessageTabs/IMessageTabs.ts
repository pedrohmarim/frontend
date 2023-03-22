import { IFilterMessageResponse } from 'helpers/filterMessageEnum';

export interface IMessageTabs {
  activeTabKey: string;
  choosedMessages: IFilterMessageResponse[];
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
}
