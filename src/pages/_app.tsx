import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/reset.css';
import * as G from 'globalStyles/global';
import GlobalStyle from 'globalStyles/global';
import theme from 'globalStyles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <G.Container>
        <G.ColumnContainer>
          <G.MessageContainer>
            <Component {...pageProps} />
          </G.MessageContainer>
        </G.ColumnContainer>
      </G.Container>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
