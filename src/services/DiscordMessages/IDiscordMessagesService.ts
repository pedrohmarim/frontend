export interface IMessage {
  id: string;
  author: IAuthor;
  content: string;
  mentions: IMention[];
}

export interface IAuthor {
  id: number;
  username: string;
}

export interface IMention {
  id: number;
  username: string;
}
