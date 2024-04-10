import React, { useState } from 'react';
import HomeDiscordleList from './components/HomeDiscordleList';
import Head from 'next/head';
import Header from '../globalComponents/header';
import * as S from './styles';
import { useMyContext } from 'Context';

export default function Home() {
  const [current, setCurrent] = useState('home');
  const [animationActive, setAnimationActive] = useState(true);
  const { windowWidth } = useMyContext();

  function renderScreen() {
    switch (current) {
      case 'home':
        return <HomeDiscordleList width={windowWidth} />;
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
        current={current}
        setCurrent={setCurrent}
        setAnimationActive={setAnimationActive}
      />

      {renderScreen()}
    </S.ContainerWrapper>
  );
}
