import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif !important;
  }

  body {
    background-image: url("https://images4.alphacoders.com/909/909912.png") !important;

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${(props) =>
        props.theme.discordleColors.primary} !important;
    }
  }
  
  nextjs-portal {
    display: none;
  }
  
  .ant-divider-inner-text{
    color: ${(props) => props.theme.colors.textSecondary};
  }

  .ant-input, .ant-input-password, .ant-input-affix-wrapper{
    background-color: ${(props) => props.theme.colors.textSecondary} !important;

    ::placeholder {
      color:${(props) => props.theme.colors.background};
      opacity: 0.5;
    }
  }

  .ant-form-item-explain-error{
    font-size: 10pt;
  }

  .codeInput {
    background-color: transparent;
    border-radius: 5px;
    max-width: 100%;
    margin-bottom: 10px;
  }

  input[type="tel"][data-id="0"],
  input[type="tel"][data-id="1"],
  input[type="tel"][data-id="2"],
  input[type="tel"][data-id="3"],
  input[type="tel"][data-id="4"],
  input[type="tel"][data-id="5"]
  {
    background-color: ${(props) => props.theme.colors.textSecondary};
    cursor: pointer;

    :disabled{
      cursor: not-allowed;
    }
  }

  .ant-form-item-label label{
    font-size: 12pt;
  }

  .ant-menu {
    background-color: ${(props) => props.theme.colors.textSecondary} !important;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
  
  .ant-menu-item:last-child {
    border-bottom: none;
  }

  .ant-menu-item {
    margin: 0 !important;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    color: ${(props) => props.theme.colors.background} !important;
    font-weight: 500 !important;

    :hover {
      color: ${(props) => props.theme.colors.textPrimary} !important;
      background-color: rgba(0, 0, 0, 0.1) !important;
    }
  }

  .ant-popconfirm-title, .ant-popconfirm-description {
    color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .ant-popover-arrow::before {
    background-color: rgba(138, 0, 194, 0.5) !important;
  }
  
  .ant-popover-message{
    color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .ant-form-item-required, .ant-checkbox-wrapper span {
    color: ${(props) => props.theme.colors.textSecondary} !important;
  }

  //Discordle
  .ant-modal-close-x {
    color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .ant-tabs-tab {
    pointer-events: none;
  }

  .ant-dropdown-menu-item {
    padding: 0 !important;
  }
  
  .ant-dropdown-menu {
    border-radius: 0 !important;
    padding: 0 !important;
  }
  
  .ant-select-selector {
    background-color: ${(props) => props.theme.discordleColors.text} !important;
    border-color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .ant-tabs-nav-wrap {
    @media screen and (max-width: 770px) {
      width: 100%;
    }

    margin: auto !important;
    flex: none !important;
  }

  .ant-tabs-top >.ant-tabs-nav::before {
    border-color: rgba(255,255,255,0.15)
  }

  .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color:${(props) => props.theme.discordleColors.primary} !important;
  }

  .ant-tabs-ink-bar {
    background-color: ${(props) =>
      props.theme.discordleColors.primary} !important;
  }

  .ant-tabs-tab-disabled{
    color:${(props) => props.theme.discordleColors.text} !important;
    opacity: 0.6;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  label, .ant-form-item-tooltip {
    color: ${(props) => props.theme.discordleColors.text} !important;
    font-weight: 500;
  }

  .ant-input:placeholder-shown {
    font-weight: bold !important;
  }

  .ant-table-placeholder {
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
    pointer-events: none;
  }

  .ant-empty-description {
    color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .stylePagination,
  .ant-pagination-item a,
  .ant-pagination-item-link {
    color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .ant-pagination-item-active {
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
    border-color: rgba(138, 0, 194, 0.4) !important;
  }

  && tbody > tr:hover > td {
    background: rgba(225, 225, 225, 0.1) !important;
  }

  .ant-pagination-item .ant-pagination-next {
    color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .ant-table-tbody,
  th {
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
    color: ${(props) => props.theme.discordleColors.text} !important;
    border-color: rgba(138, 0, 194, 0.4) !important;
  }

  td {
    border-color: rgba(138, 0, 194, 0.4) !important;
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
  }

  .active-item-row {
    cursor: pointer;
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.08);
    scale: calc(1.001);
  }

  .ant-table-small {
    height: 420px !important;
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
  }

  .ant-modal-header {
    margin-bottom: 35px !important;
  }

  .ant-modal-header, .ant-modal-content{
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
  }
  
  .ant-select-selection-placeholder {
    font-weight: 500;
    color: ${(props) => props.theme.discordleColors.background} !important;
  }

  .ant-tour {
    max-width: 300px !important;
  }
  
  .ant-tour-inner{
    border: solid 2px rgba(138, 0, 194, 0.5) !important;
  }

  .ant-tour-arrow::before {
    background-color: rgba(138, 0, 194, 0.5) !important;
  }

  .ant-tour-inner, .ant-tour-close {
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
    color: ${(props) => props.theme.discordleColors.text} !important;
  }
`;

export const HomeSpan = styled.span<{ margin?: string }>`
  color: ${(props) => props.theme.discordleColors.primary};
  margin: ${({ margin }) => margin};
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

export const DynamicWidth = styled.div<{ width: string }>`
  width: ${({ width }) => width};
`;

export const CenteredContainer = styled.div`
  @media screen and (max-width: 875px) {
    margin-top: 20px;
  }

  @media screen and (min-width: 876px) {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const OverflowDiscordle = styled.div`
  max-height: 820px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) =>
      props.theme.discordleColors.background} !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.discordleColors.primary} !important;
  }

  /* Media query para dispositivos com largura de tela até 768px pixels (por exemplo, smartphones em modo retrato) */
  @media screen and (max-width: 768px) {
    max-height: 100%; /* Ajuste conforme necessário para dispositivos móveis */
  }

  /* Media query para dispositivos com largura de tela de 769 a 1600px pixels (por exemplo, tablets em modo paisagem) */
  @media screen and (min-width: 769px) and (max-width: 1600px) {
    max-height: 700px; /* Ajuste conforme necessário para dispositivos móveis */
  }

  iframe {
    width: 100% !important;
    height: 700px !important;
    max-height: 700px !important;
    border: none;
  }
`;

export const MessageContainer = styled.div<{
  width?: string;
  margin?: string;
  maxWidth?: string;
}>`
  padding: 20px;
  text-align: center;
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  margin: ${({ margin }) => margin};
  font-size: 15pt;
  font-weight: 500;
  color: ${(props) => props.theme.discordleColors.text};
  background-color: #17171a;
  border-radius: 8px;
  border-color: rgba(255, 255, 255, 0.09);
`;
