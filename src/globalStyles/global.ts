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
    background: ${(props) => props.theme.colors.mainBackground};
    color: ${(props) => props.theme.colors.textWhite};
    font: 400 16px Roboto, sans-serif;
  }

  .ant-input{
    background-color: ${(props) => props.theme.colors.mainBackground};
  }

  .ant-form-item-explain-error{
    font-size: 10pt;
  }

  .ant-form-item-label label{
    font-size: 12pt;
  }

  .ant-menu{
    background-color: ${(props) => props.theme.colors.primary} !important;
    border-radius: 8px;
  }

  .ant-menu-item:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  .ant-menu-item:last-child {
    border-radius: 0 0 8px 8px;
  }

  .ant-menu-item{
    margin: 0 !important;
    border-radius: 8px;
    padding-top: 22px !important;
    padding-bottom: 22px !important;
    border-bottom: solid 1px gray;
    color: ${(props) => props.theme.colors.textWhite} !important;
    font-weight: 500 !important;

    :hover{
      color: ${(props) => props.theme.colors.textPurple} !important;
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
    color: ${(props) => props.theme.colors.textWhite} !important;
  }
`;
