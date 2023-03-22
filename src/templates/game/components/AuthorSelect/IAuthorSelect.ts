export interface IAuthorSelect {
  authorMessage: string;
  authorsOptions: string[];
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setActiveTabKey: React.Dispatch<React.SetStateAction<number>>;
}
