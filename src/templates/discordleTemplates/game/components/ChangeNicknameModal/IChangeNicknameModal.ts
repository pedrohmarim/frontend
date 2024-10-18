export interface IConfigurationModal {
  gridReload(): void;
  openModal: boolean;
  username: string;
  memberId: string;
  setOpenModal: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      memberId: string;
      memberUsername: string;
    }>
  >;
}

export interface IFormValues {
  newNickname: string;
}
