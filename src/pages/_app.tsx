import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/reset.css';
import * as G from 'globalStyles/global';
import GlobalStyle from 'globalStyles/global';
import theme from 'globalStyles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState<number>(0);

    useEffect(() => {
      function handleResize() {
        setWindowSize(window.innerWidth);
      }

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  }

  const size = useWindowSize();

  return (
    <ThemeProvider theme={theme}>
      <G.Container>
        <G.ColumnContainer>
          <G.MessageContainer width={`${size > 750 ? 750 : size}px`}>
            <Component {...pageProps} />
          </G.MessageContainer>
        </G.ColumnContainer>
      </G.Container>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
