import styled, { createGlobalStyle } from 'styled-components';
import { Card } from 'antd_components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif !important;
  }
  
  body {
    background: ${(props) => props.theme.colors.background};
  }

  .ant-dropdown-menu-item {
    padding: 0 !important;
  }
  
  .ant-dropdown-menu {
    border-radius: 0 !important;
    padding: 0 !important;
  }
  
  .ant-select-selector {
    background-color: ${(props) => props.theme.colors.text} !important;
    border-color: ${(props) => props.theme.colors.text} !important;
  }

  .ant-tabs-nav-wrap {
    @media screen and (max-width: 606px) {
      width: 100%;
    }

    margin: auto !important;
    flex: none !important;
  }

  .ant-tabs-top >.ant-tabs-nav::before {
    border-color: rgba(255,255,255,0.29)
  }

  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color:${(props) => props.theme.colors.primary} !important;
  }

  .ant-tabs-ink-bar {
    background-color: ${(props) => props.theme.colors.primary} !important;
  }

  .ant-tabs-tab-disabled{
    color:${(props) => props.theme.colors.text} !important;
    opacity: 0.6;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  label, .ant-form-item-tooltip {
    color: ${(props) => props.theme.colors.text} !important;
    font-weight: 500;
  }

  .ant-input {
    background-color: ${(props) => props.theme.colors.text} !important;
    border-color: ${(props) => props.theme.colors.text} !important;
  }

  .ant-input:placeholder-shown {
    font-weight: bold !important;
  }

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
    background-color: ${(props) => props.theme.colors.background} !important;
  }

  .active-item-row {
    cursor: pointer;
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.08);
    scale: calc(1.001);
  }
`;

export const HomeSpan = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ColumnContainer = styled.div`
  text-align: center;
  flex-direction: column;
  max-height: 90%;
`;

export const MessageContainer = styled(Card)<{ width: string }>`
  font-size: 15pt;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  background-color: #17171a;
  border-radius: 4px;
  border-color: rgba(255, 255, 255, 0.1);
  width: ${({ width }) => width};
`;
