import React, { useState } from 'react';
import HomeDiscordleList from './components/HomeDiscordleList';
import Head from 'next/head';
import Header from '../globalComponents/header';
import * as S from './styles';
import { useMyContext } from 'Context';
import HowWorks from './components/HowWorks';
import { Button, Row } from 'antd_components';
import theme from 'globalStyles/theme';

export default function Home() {
  const [current, setCurrent] = useState('home');
  const [animationActive, setAnimationActive] = useState(true);
  const { windowWidth } = useMyContext();

  function onClick() {
    const clientIdBot = '1089918362311733378';
    const permissions = '8'; //'75824';

    const redirectUri = encodeURIComponent(window.location.href);

    const responseType = 'code';
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientIdBot}&permissions=${permissions}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=connections%20bot`;

    window.open(url);
  }

  const BotButton = () => (
    <Row justify="center">
      <Button
        width={180}
        height={35}
        onClick={onClick}
        margin="20px 0 20px 0"
        backgroundcolor={theme.discordleColors.primary}
        color={theme.discordleColors.text}
      >
        Convidar Bot
      </Button>
    </Row>
  );

  function renderScreen() {
    switch (current) {
      case 'home':
        return <HomeDiscordleList width={windowWidth} botButton={BotButton} />;
      case 'howworks':
        return <HowWorks width={windowWidth} botButton={BotButton} />;
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
