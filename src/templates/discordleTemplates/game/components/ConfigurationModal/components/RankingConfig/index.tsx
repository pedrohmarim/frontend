import { useMyContext } from 'Context';
import theme from 'globalStyles/theme';
import DiscordleRankingApi from 'services/DiscordleService/DiscordleRanking';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import notification from 'antd_components/Notification/Notification.component';
import * as S from './styles';
import { Button, Divider, FeatherIcons, PopConfirm } from 'antd_components';

export default function RankingConfig() {
  const router = useRouter();
  const { windowWidth, serverInfos } = useMyContext();
  const isMobile = windowWidth <= 875;

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
            'Sucesso',
            `Ranking de #${channelName} foi resetado.`
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
          title={`Tem certeza que deseja resetar o ranking de #${
            serverInfos.ServerName.split('#')[1]
          }?`}
          okText="Confirmar"
          cancelText="Cancelar"
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
            Resetar ranking
          </Button>
        </PopConfirm>
      </S.Row>

      <Divider
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)', marginTop: '15px' }}
      />
    </Fragment>
  );
}
