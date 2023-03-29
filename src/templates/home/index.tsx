import React, { useState, useEffect } from 'react';
import * as S from './styles';
import * as G from 'globalStyles/global';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import theme from 'globalStyles/theme';
import { Select } from 'templates/game/components/AuthorSelect/styles';
import Head from 'next/head';
import { Spin, Row } from 'antd_components';
import DiscordMessagesApi from 'services/DiscordMessages';
import { IInstanceChannels } from 'services/DiscordMessages/IDiscordMessagesService';
import {
  GameTitle,
  MessageContainer,
} from 'templates/game/components/ChoosedMessage/styles';

export default function HomeContainer() {
  const router = useRouter();
  const [whichRender, setWhichRender] = useState<string>('gamePresentation');
  const [guildId, setGuildId] = useState<string>('');
  const [loadingInstance, setLoadingInstance] = useState<boolean>(false);
  const [loadHome, setLoadHome] = useState<boolean>(true);
  const [instanceChannels, setInstanceChannels] = useState<IInstanceChannels[]>(
    []
  );

  useEffect(() => {
    if (router.isReady) {
      const { guild_id } = router.query;

      if (guild_id) {
        setGuildId(guild_id.toString());

        DiscordMessagesApi.GetInstanceChannels(guild_id.toString())
          .then(({ channels }) => {
            setInstanceChannels(channels);
            setWhichRender('formDiscordleInstance');
          })
          .catch(() => router.push('/'))
          .finally(() => setLoadHome(false));
      } else setLoadHome(false);
    }
  }, [router]);

  const CenterButton = (
    buttonText: string,
    onClick?: () => void,
    margin?: string
  ) => (
    <S.Row justify="center">
      <S.Button
        onClick={onClick}
        boxshadow="0px 0px 10px 10px rgba(255, 255, 255, 0.08)"
        backgroundcolor={theme.colors.primary}
        color={theme.colors.text}
        width={165}
        height={35}
        margin={margin}
      >
        {buttonText}
      </S.Button>
    </S.Row>
  );

  const GamePresentation = () => (
    <>
      <S.Title>
        Bem vindo ao
        <G.HomeSpan> Discordle</G.HomeSpan>
      </S.Title>

      <S.Description>
        Esse jogo resume-se em acertar quem escreveu uma frase gerada de forma
        aleatória, retirada de um canal de texto de um servidor do{' '}
        <G.HomeSpan> Discord</G.HomeSpan>
      </S.Description>

      {CenterButton(
        'Começar',
        () => setWhichRender('botButtonContainer'),
        '25px 0 0 0'
      )}
    </>
  );

  function onChange(channelId: string) {
    setLoadingInstance(true);

    DiscordMessagesApi.CreateDiscordleInstance(channelId)
      .then(() => {
        router.push({
          pathname: '/chooseProfile',
          query: {
            channelId,
            guildId,
          },
        });
      })
      .catch(() => router.push('/'));
  }

  const FormDiscordleInstance = () => (
    <MessageContainer>
      <GameTitle>Discordle | Criar Instância</GameTitle>

      <Select
        disabled={!instanceChannels.length}
        getPopupContainer={(trigger) => trigger.parentNode}
        placeholder="Selecione um canal"
        onChange={(channelId) => onChange(String(channelId))}
      >
        {instanceChannels.length &&
          instanceChannels.map(({ channelId, channelName }) => (
            <Select.Option key={channelId}>
              <S.Row align="middle">
                <span>{channelName}</span>
              </S.Row>
            </Select.Option>
          ))}
      </Select>

      {loadingInstance && (
        <Row justify="center">
          <S.Description>
            Carregando... <LoadingOutlined spin />
          </S.Description>
        </Row>
      )}
    </MessageContainer>
  );

  const BotButtonContainer = () => (
    <MessageContainer>
      <GameTitle>Discordle</GameTitle>

      <S.Description>
        Primeiro, convite o bot para seu servidor (primeiramente certifique-se
        que você está logado como a conta <G.HomeSpan>owner </G.HomeSpan> do
        servidor que deseje usar)
      </S.Description>

      {CenterButton(
        'Convidar bot',
        () =>
          window.open(
            'https://discord.com/api/oauth2/authorize?client_id=1089918362311733378&permissions=2064&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fhome&response_type=code&scope=bot%20connections',
            '_self'
          ),
        '25px 0 0 0'
      )}
    </MessageContainer>
  );

  const WhichRender = () => {
    switch (whichRender) {
      case 'gamePresentation':
        return <GamePresentation />;
      case 'botButtonContainer':
        return <BotButtonContainer />;
      default:
        return <FormDiscordleInstance />;
    }
  };

  if (loadHome)
    return <Spin color={theme.colors.text} spinText="Carregando..." />;

  return (
    <>
      <Head>
        <title>Discordle | Home</title>
      </Head>

      <S.ColumnContainer>{WhichRender()}</S.ColumnContainer>
    </>
  );
}
