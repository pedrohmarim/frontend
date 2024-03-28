import React, { useState, useEffect, Fragment } from 'react';
import { Button } from 'antd_components';
import countdown from 'helpers/discordle/formatDate';
import { Row, FeatherIcons } from 'antd_components';
import { GameTitle } from 'templates/discordleTemplates/game/components/ChoosedMessage/styles';
import { useRouter } from 'next/router';
import * as S from './styles';
import * as I from './IResult';
import theme from 'globalStyles/theme';
import { Description } from 'templates/discordleTemplates/home/styles';
import { HomeSpan } from 'globalStyles/global';

export default function Result({ answers, totalScore }: I.IResult) {
  const router = useRouter();

  const score = answers.reduce((accumulator, curValue) => {
    return accumulator + curValue.Score;
  }, 0);

  const [timer, setTimer] = useState<string>('Carregando...');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const startCountdown = () => {
      intervalId = setInterval(() => {
        setTimer(countdown());
      }, 1000);
    };

    const { channelId, guildId } = router.query;
    if (router.isReady && channelId && guildId) {
      setTimer(countdown());
      startCountdown();
    }

    return () => clearInterval(intervalId);
  }, [router]);

  function toRanking() {
    const { channelId, guildId } = router.query;

    router.push({
      pathname: '/discordle/ranking',
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
        <S.Subtitle>
          Pontuação final: {score}/{totalScore * 5}
        </S.Subtitle>
      </Row>

      <Row justify="center">
        {answers &&
          answers
            .sort((a, b) => a.TabKey - b.TabKey)
            .map(({ Score, Success, TabKey }, index) => (
              <S.AnswerItem success={Success} score={Score} key={index}>
                {TabKey}
              </S.AnswerItem>
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
