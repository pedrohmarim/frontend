import styled from 'styled-components';
import { Row as AntdRow, Modal as AntdModal } from 'antd_components';

export const TableContainer = styled.div``;

export const Row = styled(AntdRow)`
  cursor: pointer;
`;

export const Modal = styled(AntdModal)`
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;

  .ant-modal-content,
  .ant-modal-title {
    background-color: ${(props) => props.theme.colors.background};
  }

  .ant-modal-close-x {
    color: ${(props) => props.theme.colors.text};
  }
`;

export const UserSpan = styled.span`
  margin-left: 5px;
`;

export const ModalTitle = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;
