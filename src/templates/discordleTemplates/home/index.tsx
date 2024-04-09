import React, { useState, useEffect } from 'react';
import HomeDiscordleList from './components/HomeDiscordleList';
import Head from 'next/head';
import Header from '../globalComponents/header';
import * as S from './styles';

export default function Home() {
  const [current, setCurrent] = useState('home');
  const [animationActive, setAnimationActive] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(1920);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  function renderScreen() {
    switch (current) {
      case 'home':
        return windowWidth && <HomeDiscordleList width={windowWidth} />;
      case 'howworks':
        return <>Em construção</>;
      default:
        break;
    }
  }

  return (
    <S.ContainerWrapper isAnimationActive={animationActive}>
      <Head>
        <title>Discordle | Home</title>
      </Head>

      <Header
        isHome
        windowWidth={windowWidth}
        current={current}
        setCurrent={setCurrent}
        setAnimationActive={setAnimationActive}
      />

      {renderScreen()}
    </S.ContainerWrapper>
  );
}
