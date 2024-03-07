import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import GlobalStyle, { CenteredContainer } from 'globalStyles/global';
import theme from 'globalStyles/theme';
import { ContextProvider } from '../Context';
import Loading from 'antd_components/Loading';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const renderCentered =
    router.pathname == '/login' ||
    router.pathname == '/register' ||
    router.pathname == '/recoverpassword' ||
    router.pathname == '/resetpassword' ||
    router.pathname == '/discordle/home';

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        {renderCentered ? (
          <CenteredContainer>
            <Component {...pageProps} />
          </CenteredContainer>
        ) : (
          <Component {...pageProps} />
        )}

        <GlobalStyle />

        <Loading />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default MyApp;
