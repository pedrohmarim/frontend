import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import theme from 'globalStyles/theme';
import { ContextProvider } from '../Context';
import Loading from 'antd_components/Loading';
import GlobalStyle, {
  CenteredContainer,
  OverflowDiscordle,
} from 'globalStyles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  function renderComponent() {
    const isDicordle = router.pathname.includes('/discordle');

    if (isDicordle) {
      if (router.pathname.includes('home')) return <Component {...pageProps} />;

      return (
        <CenteredContainer>
          <OverflowDiscordle>
            <Component {...pageProps} />
          </OverflowDiscordle>
        </CenteredContainer>
      );
    }

    const renderCentered =
      router.pathname == '/login' ||
      router.pathname == '/register' ||
      router.pathname == '/recoverpassword' ||
      router.pathname == '/resetpassword';

    if (renderCentered)
      return (
        <CenteredContainer>
          <Component {...pageProps} />
        </CenteredContainer>
      );

    return <Component {...pageProps} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        {renderComponent()}

        <GlobalStyle />

        <Loading />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default MyApp;
