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
