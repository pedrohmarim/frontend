import styled from 'styled-components';
import {
  Table as AntdTable,
  Row as AntdRow,
  Modal as AntdModal,
} from 'antd_components';

export const TableContainer = styled.div`
  min-height: 600px;
  min-width: 600px;
`;

export const Row = styled(AntdRow)`
  cursor: pointer;
`;

export const Modal = styled(AntdModal)`
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

export const Table = styled(AntdTable)`
  margin-top: 20px;

  .ant-table-placeholder {
    background-color: ${(props) => props.theme.colors.background} !important;
    pointer-events: none;
  }

  .ant-empty-description {
    color: ${(props) => props.theme.colors.text} !important;
  }

  .stylePagination,
  .ant-pagination-item a,
  .ant-pagination-item-link {
    color: ${(props) => props.theme.colors.text} !important;
  }

  .ant-pagination-item-active {
    background-color: ${(props) => props.theme.colors.background} !important;
    border-color: rgba(138, 0, 194, 0.4) !important;
  }

  && tbody > tr:hover > td {
    background: rgba(225, 225, 225, 0.1) !important;
  }

  .ant-pagination-item .ant-pagination-next {
    color: ${(props) => props.theme.colors.text} !important;
  }

  .ant-table-tbody,
  th {
    background-color: ${(props) => props.theme.colors.background} !important;
    color: ${(props) => props.theme.colors.text} !important;
    border-color: rgba(138, 0, 194, 0.4) !important;
  }

  td {
    border-color: rgba(138, 0, 194, 0.4) !important;
  }
`;
