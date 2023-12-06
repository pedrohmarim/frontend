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
    color: ${(props) => props.theme.colors.textWhite} ;
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

  .ant-form-item-required, .ant-checkbox-wrapper span {
    color: ${(props) => props.theme.colors.textWhite} !important;
  }
`;
