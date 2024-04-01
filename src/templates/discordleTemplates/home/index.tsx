import React, { Fragment, useState, useEffect } from 'react';
import { Button, FeatherIcons, Row } from 'antd_components';
import type { MenuProps } from 'antd';
import HomeDiscordleList from './components/HomeDiscordleList';
import * as S from './styles';
import theme from 'globalStyles/theme';
import Head from 'next/head';

export default function Home() {
  const [current, setCurrent] = useState('home');
  const [windowWidth, setWindowWidth] = useState<number>(1920);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const items: MenuProps['items'] = [
    {
      label: 'Início',
      key: 'home',
    },
    {
      label: 'Como funciona',
      key: 'howworks',
    },
  ];

  const onClickMenu: MenuProps['onClick'] = (e) => {
    if (e.key.includes('home')) {
      setAnimationActive(true);

      setTimeout(() => {
        setAnimationActive(false);
      }, 1200);
    }
    setOpen(!open);
    setCurrent(e.key);
  };

  function renderScreen() {
    switch (current) {
      case 'home':
        return windowWidth && <HomeDiscordleList width={windowWidth} />;
      case 'howworks':
        return <>howworkds</>;
      default:
        break;
    }
  }

  const styles = {
    backgroundColor: theme.discordleColors.background,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  };

  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationActive(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Discordle | Home</title>
      </Head>

      <S.ContainerWrapper isAnimationActive={animationActive}>
        {windowWidth >= 875 ? (
          <S.Row justify="end">
            <S.DesktopMenu
              onClick={onClickMenu}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
          </S.Row>
        ) : (
          <Fragment>
            <Row justify="end">
              <Button
                margin="15px"
                onClick={() => setOpen(!open)}
                width="fit-content"
                backgroundcolor="transparent"
                height="fit-content"
                icon={
                  <FeatherIcons
                    icon="menu"
                    size={40}
                    color={theme.discordleColors.primary}
                  />
                }
              />
            </Row>

            <S.Drawer
              headerStyle={styles}
              bodyStyle={styles}
              placement="left"
              title={<S.DrawerTitle>Discordle Menu</S.DrawerTitle>}
              width={300}
              onClose={() => setOpen(!open)}
              open={open}
            >
              <S.MobileMenu
                onClick={onClickMenu}
                selectedKeys={[current]}
                mode="vertical"
                items={items}
              />
            </S.Drawer>
          </Fragment>
        )}

        {renderScreen()}
      </S.ContainerWrapper>
    </Fragment>
  );
}
