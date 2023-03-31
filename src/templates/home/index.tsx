import React, { useState, useEffect } from 'react';
import * as S from './styles';
import * as G from 'globalStyles/global';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';
import Cookie from 'cookiejs';
import theme from 'globalStyles/theme';
import { Select } from 'templates/game/components/AuthorSelect/styles';
import Head from 'next/head';
import { Spin, Row } from 'antd_components';
import DiscordMessagesApi from 'services/DiscordMessages';
import { IInstanceChannels } from 'services/DiscordMessages/IDiscordMessagesService';
import { Divider } from 'templates/game/components/Result/styles';
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
    function handleReset() {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push('/');
    }

    if (router.isReady) {
      const { guild_id } = router.query;

      if (guild_id) {
        setGuildId(guild_id.toString());

        DiscordMessagesApi.GetInstanceChannels(guild_id.toString())
          .then(({ channels }) => {
            setInstanceChannels(channels);
            setWhichRender('formDiscordleInstance');
          })
          .catch(() => handleReset())
          .finally(() => setLoadHome(false));
      } else {
        const userId = Cookie.get('userId');

        if (Boolean(userId)) {
          const channelId = Cookie.get('channelId');
          const guildId = Cookie.get('guildId');

          router.push({
            pathname: '/game',
            query: {
              channelId,
              guildId,
            },
          });
        } else {
          setLoadHome(false);
          Cookie.remove('guildId');
          Cookie.remove('channelId');
        }
      }
    }
  }, [router]);

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

      <Divider />

      <S.Description>
        Primeiro, convite o bot para o servidor desejado
      </S.Description>

      <Row justify="center">
        <S.Button
          onClick={() =>
            window.open(
              'https://discord.com/api/oauth2/authorize?client_id=1089918362311733378&permissions=2064&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fhome&response_type=code&scope=bot%20connections',
              '_self'
            )
          }
          boxshadow="0px 0px 10px 10px rgba(255, 255, 255, 0.08)"
          backgroundcolor={theme.colors.primary}
          color={theme.colors.text}
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
    </>
  );

  function handleReset() {
    Cookie.remove('guildId');
    Cookie.remove('userId');
    Cookie.remove('channelId');
    router.push('/');
  }

  function onChange(channelId: string) {
    setLoadingInstance(true);

    DiscordMessagesApi.CreateDiscordleInstance(channelId, guildId)
      .then(() => {
        router.push({
          pathname: '/chooseProfile',
          query: {
            channelId,
            guildId,
          },
        });
      })
      .catch(() => handleReset());
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
              <Row align="middle">
                <span>{channelName}</span>
              </Row>
            </Select.Option>
          ))}
      </Select>

      {loadingInstance && (
        <S.Row justify="center">
          <S.Description fontSize="12pt">
            Carregando... <LoadingOutlined spin />
          </S.Description>
        </S.Row>
      )}

      <S.Row justify="center">
        <S.Description fontSize="10pt" fontStyle="italic">
          Canais de texto que não possuem pelo menos
          <G.HomeSpan> cinco </G.HomeSpan> mensagens não serão listados.
        </S.Description>
      </S.Row>
    </MessageContainer>
  );

  const WhichRender = () => {
    switch (whichRender) {
      case 'gamePresentation':
        return <GamePresentation />;
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
