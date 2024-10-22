import { useMyContext } from 'Context';
import theme from 'globalStyles/theme';
import DiscordleRankingApi from 'services/DiscordleService/DiscordleRanking';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import notification from 'antd_components/Notification/Notification.component';
import * as S from './styles';
import { Button, Divider, FeatherIcons, PopConfirm } from 'antd_components';
import { getItem } from 'utils/localStorage/User';
import { useTranslation } from 'react-i18next';

export default function RankingConfig() {
  const router = useRouter();
  const { windowWidth, serverInfos } = useMyContext();
  const isMobile = windowWidth <= 875;
  const { i18n, t } = useTranslation('GuildInfo');

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

  function resetRanking() {
    if (router.isReady) {
      const { guildId, channelId, code } = router.query;

      if (guildId && channelId && code) {
        DiscordleRankingApi.ResetRanking(
          guildId.toString(),
          channelId.toString(),
          code.toString()
        ).then((channelName) => {
          notification.success(
            t('notificationTitle'),
            `#${channelName} - ${t('successMessage')}`
          );

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      }
    }
  }

  return (
    <Fragment>
      <S.Row justify="center" align="middle">
        <PopConfirm
          title={`${t('popConfirmTitle')} (#${
            serverInfos.ServerName.split('#')[1]
          })`}
          okText={t('confirm')}
          cancelText={t('cancel')}
          onConfirm={resetRanking}
          getPopupContainer={(trigger) => trigger}
          placement="top"
          overlayStyle={{
            backgroundColor: theme.discordleColors.background,
            borderRadius: '5px',
          }}
          overlayInnerStyle={{
            border: 'solid 2px rgba(138, 0, 194, 0.5)',
            width: '360px',
            backgroundColor: theme.discordleColors.background,
          }}
          okButtonProps={{
            style: {
              backgroundColor: theme.discordleColors.primary,
              border: 'none',
            },
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: theme.discordleColors.text,
              color: theme.discordleColors.primary,
            },
          }}
        >
          <Button
            backgroundcolor={theme.discordleColors.primary}
            color={theme.discordleColors.text}
            icon={<FeatherIcons icon="rotate-cw" size={18} />}
            width={!isMobile ? 160 : '100%'}
            margin="10px 0"
          >
            {t('resetRanking')}
          </Button>
        </PopConfirm>
      </S.Row>

      <Divider
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)', marginTop: '26.5px' }}
      />
    </Fragment>
  );
}
