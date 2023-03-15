export interface IMessage {
  id: string;
  author: IAuthor;
  content: string;
  mentions: IMention[];
  attachments: IAttachments[];
  timestamp: string;
}

export interface IAttachments {
  url: string;
  height: number;
  width: number;
}

export interface IAuthor {
  id: string;
  username: string;
}

export interface IMention {
  username: string;
  id: string;
}
