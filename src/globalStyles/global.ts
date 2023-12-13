import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-size: 12pt;
    box-sizing: border-box;
  }
  
  nextjs-portal {
    display: none;
  }
  
  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.textSecondary};
    font: 400 16px Roboto, sans-serif;
  }
  
  .ant-divider-inner-text{
    color: ${(props) => props.theme.colors.textSecondary};
  }

  .ant-input, .ant-input-password, .ant-input-affix-wrapper{
    background-color: ${(props) => props.theme.colors.textSecondary} !important;
  }

  .ant-form-item-explain-error{
    font-size: 10pt;
  }

  .ant-form-item-label label{
    font-size: 12pt;
  }

  .ant-menu {
    background-color: ${(props) => props.theme.colors.textSecondary} !important;
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  /* 
  .ant-menu-item:first-child {
    border-radius: 8px 8px 0 0;
  } */
  
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

  .ant-popover-inner-content {
    width: 135px;
    position: absolute;
    top: -10px;
    left: -110px;
    padding: 0 !important;
  }

  .ant-form-item-required, .ant-checkbox-wrapper span {
    color: ${(props) => props.theme.colors.textSecondary} !important;
  }
`;
