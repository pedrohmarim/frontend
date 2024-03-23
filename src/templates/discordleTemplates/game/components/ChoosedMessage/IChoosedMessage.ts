import {
  IAuthor,
  IReferencedMessage,
} from 'services/DiscordleService/IDiscordleService';
import {
  FilterMessageEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export interface IChoosedMessageComponent {
  score: number;
  message: IChoosedMessage;
  serverName: string;
  authorSelected: string;
  usedHint: boolean;
  tabkey: number;
  serverIcon: string;
  items: ItemType[];
  loading: boolean;
  stillOpen: {
    tooltip: boolean;
    popconfirm: boolean;
    dropdown: boolean;
  };
  setStillOpen: React.Dispatch<
    React.SetStateAction<{
      tooltip: boolean;
      popconfirm: boolean;
      dropdown: boolean;
    }>
  >;
}

export interface IChoosedMessage {
  id: string;
  urlLink: string;
  content: string;
  timestamp: string;
  messageType: FilterMessageEnum;
  messageLevel?: MessageLevelEnum;
  formattedAttachs: JSX.Element[];
  referencedMessage?: IReferencedMessage;
  author?: IAuthor;
}
