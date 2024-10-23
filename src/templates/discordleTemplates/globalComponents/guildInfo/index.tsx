import React, { Fragment, useState } from 'react';
import * as S from './styles';
import Image from 'next/image';
import copy from 'clipboard-copy';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import { HomeSpan } from 'globalStyles/global';
import { deleteDiscordleToken } from 'utils/localStorage/User';
import { MenuProps } from 'antd';
import * as I from './IGuildInfo';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Col,
  Divider,
  FeatherIcons,
  Menu,
  Row,
  Tooltip,
  Skeleton,
} from 'antd_components';

export default function GuildInfo({
  openModal = false,
  setOpenModal,
}: I.IGuildInfo) {
  const [stateCopy, setStateCopy] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useTranslation('GuildInfo');

  const {
    isOwner,
    serverInfos,
    windowWidth,
    sessionUser,
    guildInfoLoading,
    setSessionUser,
  } = useMyContext();

  const isMobile = windowWidth <= 875;

  function handleCopy() {
    if (router.query.code) {
      copy(router.query.code.toString());
      setStateCopy(true);
    }
  }

  function handleLogout() {
    const { guildId, channelId, code } = router.query;

    deleteDiscordleToken();
    setSessionUser(null);

    router.push({
      pathname: 'chooseProfile',
      query: {
        guildId,
        channelId,
        code,
      },
    });
  }

  type MenuItem = Required<MenuProps>['items'][number];

  function getMenuItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void
  ): MenuItem {
    return {
      key,
      icon,
      label,
      onClick,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getMenuItem(
      t('logOut'),
      '1',
      <FeatherIcons icon="log-out" />,
      handleLogout
    ),
  ];

  if (isOwner && setOpenModal)
    items.push(
      getMenuItem(t('settings'), '2', <FeatherIcons icon="settings" />, () =>
        setOpenModal(!openModal)
      )
    );

  const content = (
    <Menu
      mode="inline"
      theme="dark"
      items={items
        .slice()
        .sort(
          (a, b) =>
            parseInt(b?.key as string, 10) - parseInt(a?.key as string, 10)
        )}
    />
  );

  return (
    <Fragment>
      <Skeleton loading={guildInfoLoading} active={guildInfoLoading}>
        <S.ServerInfoContainer justify={isMobile ? 'center' : 'space-between'}>
          <Row justify={isMobile ? 'center' : 'start'} align="middle">
            {serverInfos.ServerIcon && (
              <Image
                src={serverInfos.ServerIcon}
                alt="img"
                width={90}
                height={90}
                style={{ borderRadius: '50%' }}
              />
            )}

            <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
              <Row gutter={[0, 5]} justify={isMobile ? 'center' : 'start'}>
                <S.ServerName isMobile={isMobile}>
                  {serverInfos.ServerName}
                </S.ServerName>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Row justify={isMobile ? 'center' : 'start'}>
                    <S.ServerCode isMobile={isMobile}>
                      {t('codeRoom')} <HomeSpan>{router.query.code}</HomeSpan>
                    </S.ServerCode>

                    <Tooltip title={stateCopy ? t('copied') : t('copy')}>
                      <S.Clipboard
                        onClick={handleCopy}
                        onMouseLeave={() => setStateCopy(false)}
                      >
                        <FeatherIcons icon="clipboard" size={15} />
                      </S.Clipboard>
                    </Tooltip>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          {sessionUser && (
            <S.Popover
              {...(openModal && { open: !openModal })}
              content={content}
              ismobile={isMobile}
              placement="bottomRight"
            >
              <Avatar src={sessionUser.AvatarUrl} size={60} />
            </S.Popover>
          )}
        </S.ServerInfoContainer>
      </Skeleton>

      <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
    </Fragment>
  );
}
