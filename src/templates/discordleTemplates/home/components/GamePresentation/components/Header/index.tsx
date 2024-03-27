import React, { Fragment, useState, useEffect } from 'react';
import { Button, FeatherIcons, Row } from 'antd_components';
import type { MenuProps } from 'antd';
import HomeDiscordlesList from '../HomeDiscordleList';
import * as S from './styles';
import theme from 'globalStyles/theme';

export default function Header() {
  const [current, setCurrent] = useState('home');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      setWindowWidth(window.innerWidth);

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

  const onClick: MenuProps['onClick'] = (e) => {
    setOpen(!open);
    setCurrent(e.key);
  };

  function renderScreen() {
    switch (current) {
      case 'home':
        return <HomeDiscordlesList isMobile={windowWidth > 600} />;
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

  return (
    <S.ContainerWrapper>
      {windowWidth > 600 ? (
        <S.Row justify="end">
          <S.DesktopMenu
            onClick={onClick}
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
              onClick={onClick}
              selectedKeys={[current]}
              mode="vertical"
              items={items}
            />
          </S.Drawer>
        </Fragment>
      )}

      {renderScreen()}
    </S.ContainerWrapper>
  );
}
