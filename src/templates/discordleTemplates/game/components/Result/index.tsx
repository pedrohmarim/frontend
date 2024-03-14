import React, { useState, useCallback, useEffect, Fragment } from 'react';
import { Button } from 'antd_components';
import formatDate from 'helpers/discordle/formatDate';
import DiscordMessagesApi from 'services/DiscordleService/DiscordleGame';
import { Row, FeatherIcons } from 'antd_components';
import { GameTitle } from 'templates/discordleTemplates/game/components/ChoosedMessage/styles';
import { useRouter } from 'next/router';
import * as S from './styles';
import * as I from './IResult';
import theme from 'globalStyles/theme';
import { Description } from 'templates/discordleTemplates/home/styles';
import { HomeSpan } from 'globalStyles/global';

export default function Result({ awnsers }: I.IResult) {
  const router = useRouter();

  const score = awnsers.reduce((accumulator, curValue) => {
    return accumulator + curValue.Score;
  }, 0);

  const [timer, setTimer] = useState<string>('Carregando...');

  const handleFormatDate = useCallback(
    (timer: string, channelId: string, guildId: string) => {
      formatDate(timer, channelId, guildId, setTimer);
    },
    []
  );

  useEffect(() => {
    if (router.isReady) {
      const { channelId, guildId } = router.query;

      if (channelId && guildId)
        DiscordMessagesApi.GetTimer(
          channelId.toString(),
          guildId.toString()
        ).then((timer) =>
          handleFormatDate(timer, channelId.toString(), guildId.toString())
        );
    }
  }, [handleFormatDate, router]);

  function toRanking() {
    const { channelId, guildId } = router.query;

    router.push({
      pathname: '/ranking',
      query: {
        channelId,
        guildId,
      },
    });
  }

  return (
    <Fragment>
      <GameTitle>
        🥳🎉<S.MarginSpan margin="0 10px">Resultado</S.MarginSpan>🎉🥳
      </GameTitle>

      <Row justify="center">
        <FeatherIcons icon="star" size={21} />
        <S.Subtitle>Pontuação final: {score}/10</S.Subtitle>
      </Row>

      <Row justify="center">
        {awnsers &&
          awnsers.map(({ Score, Success, TabKey }, index) => (
            <S.AwnserItem success={Success} score={Score} key={index}>
              {TabKey}
            </S.AwnserItem>
          ))}
      </Row>

      <S.Divider />

      <S.Span>Próxima atualização em:</S.Span>

      <S.TimerContainer>{timer}</S.TimerContainer>

      <Row justify="end">
        <Description fontSize="10.5pt" fontStyle="italic">
          Atualização todos os dias ás
          <HomeSpan> 23:59 </HomeSpan>
        </Description>
      </Row>

      <Row justify="end">
        <Description fontSize="10.5pt" fontStyle="italic">
          América/São_Paulo
        </Description>
      </Row>

      <S.Divider />

      <Row justify="center">
        <Button
          width={150}
          backgroundcolor={theme.discordleColors.primary}
          color={theme.discordleColors.text}
          onClick={toRanking}
          icon={<FeatherIcons icon="award" size={20} />}
        >
          <S.MarginSpan margin="0 0 0 5px">Ranking</S.MarginSpan>
        </Button>
      </Row>
    </Fragment>
  );
}
