import React, { Fragment, useEffect, useState } from 'react';
import * as S from './styles';
import { Checkbox, Col, Divider, FeatherIcons, Tooltip } from 'antd_components';
import theme from 'globalStyles/theme';
import DiscordleInstance from 'services/DiscordleService/DiscordleInstance';
import { useRouter } from 'next/router';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import notification from 'antd_components/Notification/Notification.component';

export default function PrivacyConfig() {
  const router = useRouter();
  const [value, setValue] = useState<boolean>();

  function onChangeCheckBox({ target }: CheckboxChangeEvent) {
    setValue(target.checked);

    if (router.isReady && router.query.guildId)
      DiscordleInstance.UpdateShowDiscordOnHomeGuild(
        target.checked,
        router.query.guildId.toString()
      ).then(() => {
        const description = `A guild ${
          value ? 'não será mais' : 'será'
        } listada na página inicial.`;

        notification.success('Sucesso', description);
      });
  }

  useEffect(() => {
    if (router.isReady && router.query.guildId)
      DiscordleInstance.GetShowDiscordOnHomeGuild(
        router.query.guildId.toString()
      ).then((value) => setValue(value));
  }, [router]);

  return (
    <Fragment>
      <S.Container>
        <S.Span> Exibir servidor na listagem da página inicial.</S.Span>

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
    </Fragment>
  );
}
