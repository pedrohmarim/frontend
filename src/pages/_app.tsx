import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/reset.css';
import * as G from 'globalStyles/global';
import GlobalStyle from 'globalStyles/global';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

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
          <G.DynamicWidth
            width={
              router.pathname === '/game' && size > 700
                ? 'fit-content'
                : size > 700
                ? `${700}px`
                : `${size}px`
            }
          >
            <Component {...pageProps} />
          </G.DynamicWidth>
        </G.ColumnContainer>
      </G.Container>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
