import styled, { createGlobalStyle } from 'styled-components';

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
    margin: auto !important;
    flex: none !important;
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
