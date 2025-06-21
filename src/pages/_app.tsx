import React, { Fragment } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from 'globalStyles/theme';
import { ContextProvider } from '../Context';
import Loading from 'antd_components/Loading';
import Icon from 'assets/icon.png';
import Header from 'templates/discordleTemplates/globalComponents/header';
import Footer from 'templates/discordleTemplates/globalComponents/footer';
import GlobalStyle from 'globalStyles/global';
import Head from 'next/head';
import 'i18n';
// import Announcement from 'templates/discordleTemplates/globalComponents/announcement';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  function renderComponent() {
    if (router.pathname.includes('home'))
      return (
        <Fragment>
          <Component {...pageProps} />
          <Footer />
        </Fragment>
      );

    return (
      <Fragment>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Fragment>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href={Icon.src} />
      </Head>
      <ContextProvider>
        {renderComponent()}

        {/* <Announcement /> */}

        <GlobalStyle />

        <Loading />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default MyApp;
