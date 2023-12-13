import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import GlobalStyle from 'globalStyles/global';
import theme from 'globalStyles/theme';
import { ContextProvider } from '../Context';
import * as S from './styles';
import Loading from 'antd_components/Loading';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const renderCentered =
    router.pathname == '/login' ||
    router.pathname == '/register' ||
    router.pathname == '/recoverpassword';

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        {renderCentered ? (
          <S.CenteredContainer>
            <Component {...pageProps} />
          </S.CenteredContainer>
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
