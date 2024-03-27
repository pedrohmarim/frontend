import React from 'react';
import * as I from './IFormDiscordleInstance';
import * as S from '../../styles';
import * as G from 'globalStyles/global';
import { useRouter } from 'next/router';
import DiscordInstanceApi from 'services/DiscordleService/DiscordleInstance';
import { Row, FeatherIcons, Tooltip } from 'antd_components';
import { Divider } from 'templates/discordleTemplates/game/components/Result/styles';
import { Select } from 'templates/discordleTemplates/game/components/AuthorSelect/styles';
import { GameTitle } from 'templates/discordleTemplates/game/components/ChoosedMessage/styles';

export default function FormDiscordleInstance({
  instanceChannels,
  width,
  handleReload,
}: I.IFormDiscordleInstance) {
  const router = useRouter();

  function onChange(channelId: string) {
    if (router.isReady) {
      const { guild_id, code } = router.query;

      if (guild_id && channelId && code) {
        const guildId = guild_id.toString();

        DiscordInstanceApi.CreateDiscordleInstance(
          channelId,
          guildId,
          code.toString()
        )
          .then(() =>
            router.push({
              pathname: '/discordle/chooseProfile',
              query: {
                channelId,
                guildId,
                code,
              },
            })
          )
          .finally(() => handleReload());
      }
    }
  }

  return (
    <G.MessageContainer width={width > 850 ? '60%' : '100%'} margin="auto">
      <GameTitle>Discordle | Criar Instância</GameTitle>

      <S.NegativeMarginRow justify="center" align="middle">
        <Select
          allowClear
          disabled={!instanceChannels?.length}
          onChange={(channelId) => onChange(String(channelId))}
          showSearch
          notFoundContent={<Row justify="center">Sem dados</Row>}
          placeholder={
            instanceChannels.length
              ? 'Selecione um canal'
              : 'Não há canais a serem exibidos'
          }
          filterOption={(inputValue, option) => {
            return option?.children?.props?.children?.props?.children
              .join('')
              .toLowerCase()
              .includes(`${inputValue.toLowerCase()}`);
          }}
        >
          {instanceChannels?.length &&
            instanceChannels.map(({ ChannelId, ChannelName }) => (
              <Select.Option key={ChannelId}>
                <Row align="middle">
                  <Row justify="center" align="middle">
                    #{ChannelName}
                  </Row>
                </Row>
              </Select.Option>
            ))}
        </Select>

        <Tooltip title="Recarregar" placement="right">
          <S.ReloadContainer onClick={handleReload}>
            <FeatherIcons icon="rotate-ccw" size={20} />
          </S.ReloadContainer>
        </Tooltip>
      </S.NegativeMarginRow>

      <Divider />

      <S.Row justify="end">
        <S.Description fontSize="12pt">
          <G.HomeSpan>Informações adicionais:</G.HomeSpan>
        </S.Description>
      </S.Row>

      <S.Row justify="end">
        <S.Description fontSize="11pt" textAlign="right">
          Canais de texto com quantidade e variedade baixas de mensagens não
          serão criados, certifique-se de escolher um canal com muito conteudo!
        </S.Description>
      </S.Row>
    </G.MessageContainer>
  );
}
