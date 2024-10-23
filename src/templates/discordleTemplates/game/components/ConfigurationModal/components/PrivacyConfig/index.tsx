import React, { Fragment, useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import theme from 'globalStyles/theme';
import DiscordleInstance from 'services/DiscordleService/DiscordleInstance';
import { useRouter } from 'next/router';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import notification from 'antd_components/Notification/Notification.component';
import { Checkbox, Col, Divider, FeatherIcons, Tooltip } from 'antd_components';
import DebouncedTextInput from 'templates/discordleTemplates/globalComponents/deboucedTextInput';
import { useTranslation } from 'react-i18next';

export default function PrivacyConfig() {
  const router = useRouter();
  const { t } = useTranslation('GuildInfo');
  const [value, setValue] = useState<boolean>();

  function onChangeCheckBox({ target }: CheckboxChangeEvent) {
    if (router.isReady) {
      setValue(target.checked);
      const { guildId, channelId, code } = router.query;

      if (guildId && channelId && code) {
        DiscordleInstance.UpdateShowDiscordOnHomeGuild(
          target.checked,
          guildId.toString()
        ).then(() => {
          if (value)
            notification.success(
              t('notificationTitle'),
              t('notificationDescription')
            );
          else
            notification.success(
              t('notificationTitle'),
              t('notificationDescription2')
            );
        });
      }
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { guildId, channelId, code } = router.query;

      if (guildId && channelId && code) {
        DiscordleInstance.GetShowDiscordOnHomeGuild(
          guildId.toString(),
          channelId.toString(),
          code.toString()
        ).then((value) => setValue(value));
      }
    }
  }, [router]);

  const handleDebounce = useCallback(
    async (value: string) => {
      if (router.isReady && value.length) {
        const { guildId, channelId, code } = router.query;

        if (guildId && channelId && code)
          DiscordleInstance.UpdateDiscordleInstanceCode(
            guildId.toString(),
            channelId.toString(),
            code.toString(),
            value
          ).then(() => {
            //isso atualiza td dnv :(
            router.push({
              query: {
                ...router.query,
                ['code']: value,
              },
            });

            notification.success(
              t('notificationTitle'),
              t('notificationDescription3')
            );
          });
      } else
        notification.error(
          t('errorNotificationTitle'),
          t('notificationDescription4')
        );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [router, t]
  );

  return (
    <Fragment>
      <S.Container>
        <S.Span>{t('span')}</S.Span>

        <Tooltip title={t('tooltipTitle')}>
          <FeatherIcons
            style={{ cursor: 'help' }}
            icon="help-circle"
            size={20}
            color={theme.discordleColors.text}
          />
        </Tooltip>
      </S.Container>

      <Col span={24}>
        <Checkbox checked={value} onChange={onChangeCheckBox}>
          {t('checkboxLabel')}
        </Checkbox>
      </Col>

      <Divider
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)',
          marginTop: '22.5px',
        }}
      />

      <S.Container>
        <S.Span>{t('roomCode')}.</S.Span>

        <Tooltip title={t('tooltipTitle2')}>
          <FeatherIcons
            style={{ cursor: 'help' }}
            icon="help-circle"
            size={20}
            color={theme.discordleColors.text}
          />
        </Tooltip>
      </S.Container>

      <DebouncedTextInput
        size="middle"
        placeholder={t('roomCode')}
        handleDebounce={handleDebounce}
        defaultValue={router.query.code}
      />

      <Divider
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)',
          marginTop: '22.5px',
        }}
      />
    </Fragment>
  );
}
