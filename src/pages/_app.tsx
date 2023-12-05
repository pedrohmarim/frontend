import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import GlobalStyle from 'globalStyles/global';
import theme from 'globalStyles/theme';
import { ContextProvider } from '../Context';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default MyApp;
