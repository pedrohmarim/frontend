import React, { useState, useCallback, useEffect } from 'react';
import { Button } from 'antd_components';
import formatDate from 'helpers/formatDate';
import DiscordMessagesApi from 'services/DiscordMessages';
import { Row, FeatherIcons } from 'antd_components';
import { GameTitle } from '../ChoosedMessage/styles';
import { useRouter } from 'next/router';
import * as S from './styles';
import * as I from './IResult';
import theme from 'globalStyles/theme';

export default function Result({ awnsers }: I.IResult) {
  const router = useRouter();

  const score = awnsers.reduce((accumulator, curValue) => {
    return accumulator + curValue.score;
  }, 0);

  const [timer, setTimer] = useState<string>('Carregando...');

  const handleFormatDate = useCallback((timer: string) => {
    formatDate(timer, setTimer);
  }, []);

  useEffect(() => {
    DiscordMessagesApi.GetTimer().then((timer) => handleFormatDate(timer));
  }, [handleFormatDate]);

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
    <>
      <GameTitle>
        🥳🎉<S.MarginSpan margin="0 10px">Resultado</S.MarginSpan>🎉🥳
      </GameTitle>

      <Row justify="center">
        <FeatherIcons icon="star" size={21} />
        <S.Subtitle>Pontuação final: {score}/10</S.Subtitle>
      </Row>

      <Row justify="center">
        {awnsers &&
          awnsers.map(({ score, success, tabKey }, index) => (
            <S.AwnserItem success={success} score={score} key={index}>
              {tabKey}
            </S.AwnserItem>
          ))}
      </Row>

      <S.Divider />

      <S.Span>Próxima atualização em:</S.Span>

      <S.TimerContainer>{timer}</S.TimerContainer>

      <S.Divider />

      <Row justify="center">
        <Button
          width={150}
          backgroundcolor={theme.colors.primary}
          color={theme.colors.text}
          onClick={toRanking}
          icon={<FeatherIcons icon="award" size={20} />}
        >
          <S.MarginSpan margin="0 0 0 5px">Ranking</S.MarginSpan>
        </Button>
      </Row>
    </>
  );
}
