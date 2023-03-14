import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    font: 400 16px Roboto, sans-serif;
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
