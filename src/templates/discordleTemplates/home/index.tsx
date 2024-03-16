import React, { useState, useEffect, Fragment } from 'react';
import * as S from './styles';
import * as G from 'globalStyles/global';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import Head from 'next/head';
import { Row, FeatherIcons, Tooltip } from 'antd_components';
import DiscordGuildsApi from 'services/DiscordleService/DiscordleGuilds';
import DiscordInstanceApi from 'services/DiscordleService/DiscordleInstance';
import { IInstanceChannels } from 'services/DiscordleService/IDiscordleService';
import { Select } from 'templates/discordleTemplates/game/components/AuthorSelect/styles';
import { Divider } from 'templates/discordleTemplates/game/components/Result/styles';
import { GameTitle } from 'templates/discordleTemplates/game/components/ChoosedMessage/styles';

export default function HomeContainer() {
  const router = useRouter();
  const [whichRender, setWhichRender] = useState<string>('gamePresentation');
  const [guildId, setGuildId] = useState<string | null>(null);
  const [instanceChannels, setInstanceChannels] = useState<IInstanceChannels[]>(
    []
  );

  function onClick() {
    const clientIdBot = '1089918362311733378';
    const permissions = '75824';
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_REDIRECT_URI ?? ''
    );

    const responseType = 'code';
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientIdBot}&permissions=${permissions}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=connections%20bot`;

    window.open(url);
  }

  useEffect(() => {
    if (router.isReady) {
      const { guild_id } = router.query;

      if (guild_id) {
        setGuildId(guild_id.toString());

        DiscordGuildsApi.GetGuildById(guild_id.toString())
          .then((channels) => {
            setInstanceChannels(channels);
            setWhichRender('formDiscordleInstance');
          })
          .finally(() => handleReload());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const GamePresentation = () => (
    <G.MessageContainer width="70%" margin="auto">
      <S.Title>
        Bem vindo ao
        <G.HomeSpan> Discordle</G.HomeSpan>
      </S.Title>

      <S.Description>
        Esse jogo resume-se em acertar quem escreveu uma frase gerada de forma
        aleatória, retirada de um canal de texto de um servidor do{' '}
        <G.HomeSpan> Discord</G.HomeSpan>
      </S.Description>

      <Divider />

      <S.Description>
        Primeiro, convite o bot para o servidor desejado
      </S.Description>

      <Row justify="center">
        <S.Button
          onClick={onClick}
          boxshadow="0px 0px 10px 10px rgba(255, 255, 255, 0.08)"
          backgroundcolor={theme.discordleColors.primary}
          color={theme.discordleColors.text}
          width={165}
          height={35}
          margin="25px 0 55px 0"
        >
          Convidar bot
        </S.Button>
      </Row>

      <Row justify="end">
        <S.Description fontSize="10.5pt" fontStyle="italic">
          *Certifique-se de estar logado na conta de cargo
          <G.HomeSpan> Dono </G.HomeSpan> do servidor que deseje usar.
        </S.Description>
      </Row>
    </G.MessageContainer>
  );

  function onChange(channelId: string) {
    if (guildId) {
      DiscordInstanceApi.CreateDiscordleInstance(channelId, guildId).then(() =>
        router.push({
          pathname: '/discordle/chooseProfile',
          query: {
            channelId,
          },
        })
      );
    }
  }

  function handleReload() {
    if (guildId) {
      DiscordGuildsApi.GetGuildById(guildId).then((channels) => {
        setInstanceChannels(channels);
        setWhichRender('formDiscordleInstance');
      });
    }
  }

  const FormDiscordleInstance = () => (
    <G.MessageContainer width="99.3%">
      <GameTitle>Discordle | Criar Instância</GameTitle>

      <S.NegativeMarginRow justify="center" align="middle">
        <Select
          disabled={!instanceChannels?.length}
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder={
            instanceChannels.length
              ? 'Selecione um canal'
              : 'Não há canais a serem exibidos'
          }
          onChange={(channelId) => onChange(String(channelId))}
        >
          {instanceChannels?.length &&
            instanceChannels.map(
              ({
                ChannelId: channelId,
                ChannelName: channelName,
                NotListed: notListed,
              }) => (
                <Select.Option key={channelId}>
                  <Row align="middle">
                    <Row justify="center" align="middle">
                      #{channelName}
                      {notListed && <S.NewHighlight> (Novo!)</S.NewHighlight>}
                    </Row>
                  </Row>
                </Select.Option>
              )
            )}
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
        <S.Description fontSize="11pt">
          Para canais <G.HomeSpan>privados</G.HomeSpan> serem listados, adicione
          o bot ao canal desejado e clique em &quot;Recarregar&quot;.
        </S.Description>
      </S.Row>

      <S.Row justify="end">
        <S.Description fontSize="11pt">
          Canais de texto que não possuem pelo menos
          <G.HomeSpan> cinco</G.HomeSpan> mensagens não serão listados.
        </S.Description>
      </S.Row>
    </G.MessageContainer>
  );

  const WhichRender = () => {
    switch (whichRender) {
      case 'gamePresentation':
        return <GamePresentation />;
      default:
        return <FormDiscordleInstance />;
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Discordle | Home</title>
      </Head>

      {WhichRender()}
    </Fragment>
  );
}
