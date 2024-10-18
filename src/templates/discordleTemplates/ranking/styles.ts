import styled from 'styled-components';
import { Row as AntdRow, Modal as AntdModal } from 'antd_components';
import { Button as AntdButton } from 'antd';

export const TableContainer = styled.div``;

export const ClassificationTitle = styled(AntdRow)`
  font-size: 20pt;
  margin-bottom: 20px;
`;

export const Description = styled(AntdRow)`
  font-size: 12pt;
  margin-bottom: 20px;
`;

export const TableButton = styled(AntdButton)`
  display: none;
  margin-left: 20px;
  border-color: ${(props) => props.theme.discordleColors.primary};
  background-color: ${(props) => props.theme.discordleColors.primary};
  color: ${(props) => props.theme.discordleColors.text};

  :hover {
    border-color: ${(props) => props.theme.discordleColors.primary} !important;
    background-color: ${(props) =>
      props.theme.discordleColors.primary} !important;
    color: ${(props) => props.theme.discordleColors.text} !important;
  }
`;

export const TableRow = styled(AntdRow)`
  :hover {
    & ${TableButton} {
      display: block;
    }
  }
`;

export const Row = styled(AntdRow)`
  cursor: pointer;
`;

export const Modal = styled(AntdModal)`
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;

  .ant-modal-content,
  .ant-modal-title {
    background-color: ${(props) => props.theme.discordleColors.background};
  }

  .ant-modal-close-x {
    color: ${(props) => props.theme.discordleColors.text};
  }
`;

export const UserSpan = styled.span`
  margin-left: 5px;
`;

export const ModalTitle = styled.span`
  color: ${(props) => props.theme.discordleColors.text};
`;

export const ButtonRow = styled(AntdRow)`
  margin-top: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: middle;
  gap: 16px;
  flex-wrap: wrap;
`;
