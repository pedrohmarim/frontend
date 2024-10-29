import React, { useEffect, useState } from 'react';
import HomeDiscordleList from './components/HomeDiscordleList';
import Head from 'next/head';
import Header from '../globalComponents/header';
import * as S from './styles';
import { useMyContext } from 'Context';
import HowWorks from './components/HowWorks';
import { Button, Row } from 'antd_components';
import theme from 'globalStyles/theme';
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';
import TermsOfUseModal from './components/TermsOfUseModal';

export default function Home() {
  const [current, setCurrent] = useState('home');
  const [animationActive, setAnimationActive] = useState(true);
  const [open, setOpen] = useState(false);
  const { windowWidth } = useMyContext();
  const { i18n, t } = useTranslation('Home');
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result).then(() => setLanguageLoaded(true));
    else setLanguageLoaded(true);
  }, [i18n]);

  function onClick() {
    setOpen(!open);
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
        {t('btnInviteBot')}
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

  if (!languageLoaded) return null;

  return (
    <S.ContainerWrapper isAnimationActive={animationActive}>
      <Head>
        <title>Discordle | {t('tabTitle')}</title>
      </Head>

      <TermsOfUseModal open={open} setOpen={setOpen} />

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
