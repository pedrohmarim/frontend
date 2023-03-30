import { IFilterMessageResponse } from 'helpers/filterMessageEnum';
import { IAwnser } from 'templates/game/IGame';

export interface IMessageTabs {
  activeTabKey: number;
  choosedMessages: IFilterMessageResponse[];
  awnsers: IAwnser[];
  serverName: string;
  serverIcon: string;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
  setAwnsers: React.Dispatch<React.SetStateAction<IAwnser[]>>;
}
