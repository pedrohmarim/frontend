import React, { Fragment, useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import theme from 'globalStyles/theme';
import DiscordleInstance from 'services/DiscordleService/DiscordleInstance';
import { useRouter } from 'next/router';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import notification from 'antd_components/Notification/Notification.component';
import { Checkbox, Col, Divider, FeatherIcons, Tooltip } from 'antd_components';
import DebouncedTextInput from 'templates/discordleTemplates/globalComponents/deboucedTextInput';

export default function PrivacyConfig() {
  const router = useRouter();
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
          const description = `A guild ${
            value ? 'não será mais' : 'será'
          } listada na página inicial.`;

          notification.success('Sucesso', description);
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

            notification.success('Sucesso', 'Código atualizado com sucesso.');
          });
      } else notification.error('Erro', 'Valor inválido');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [router]
  );

  return (
    <Fragment>
      <S.Container>
        <S.Span>Exibir servidor na listagem da página inicial.</S.Span>

        <Tooltip title="Na página inicial do Discordle, seu servidor será listado, permitindo a visualização de que seu servidor faz parte do Discordle para o público (Apenas usuários com a senha do servidor poderão acessar).">
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
          Habilitar exibição
        </Checkbox>
      </Col>

      <Divider
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)',
          marginTop: '22.5px',
        }}
      />

      <S.Container>
        <S.Span>Código da sala.</S.Span>

        <Tooltip title="Usado para entrar no Discordle do canal através da página inicial">
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
        placeholder="Código da sala"
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
