export interface IAuthorSelect {
  authorMessage: string;
  authorsOptions: string[];
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}
