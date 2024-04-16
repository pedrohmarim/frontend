import React, { Fragment, useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/router';
import * as S from './styles';
import * as I from './IHeader';
import theme from 'globalStyles/theme';
import Logo from 'assets/logo.png';
import { Button, FeatherIcons, Row, Image } from 'antd_components';
import { useMyContext } from 'Context';

export default function Header({
  current,
  isHome,
  setCurrent,
  setAnimationActive,
}: I.IHeader) {
  const { windowWidth } = useMyContext();

  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (setAnimationActive) setAnimationActive(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [setAnimationActive]);

  if (!setAnimationActive || !setCurrent || !current || !isHome)
    return (
      <S.OnlyLogoRow onClick={() => router.push('/discordle/home')}>
        <Image src={Logo.src} alt="logo" preview={false} height={60} />
      </S.OnlyLogoRow>
    );

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

  const styles = {
    backgroundColor: theme.discordleColors.background,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  };

  return (
    <Fragment>
      {windowWidth && windowWidth >= 875 ? (
        <S.Row justify="space-between" align="middle">
          <Image
            onClick={() => setCurrent('home')}
            src={Logo.src}
            alt="logo"
            preview={false}
            height={60}
            width={210}
            style={{ marginLeft: '25px', cursor: 'pointer' }}
          />

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
            style={styles}
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
    </Fragment>
  );
}
