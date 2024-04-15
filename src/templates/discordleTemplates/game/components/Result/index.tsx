import React, { useState, useEffect, Fragment } from 'react';
import { Button } from 'antd_components';
import countdown from 'helpers/discordle/formatDate';
import { Row, FeatherIcons } from 'antd_components';
import { useRouter } from 'next/router';
import * as S from './styles';
import * as I from './IResult';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import theme from 'globalStyles/theme';
import { HomeSpan, MessageContainer } from 'globalStyles/global';
import { Description } from 'templates/discordleTemplates/home/components/SelectChanneInstanceModal/styles';
import { useMyContext } from 'Context';
import filterMessage from 'helpers/discordle/filter.message';
import { IMessage } from 'services/DiscordleService/IDiscordleService';
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';
import DisplayMessageContainer from '../DisplayMessageContainer';

export default function Result({
  answers,
  totalScore,
  switchValues,
}: I.IResult) {
  const router = useRouter();
  const [resultDetails, setResultDetails] = useState<IMessage[]>([]);
  const { windowWidth } = useMyContext();
  const isMobile = windowWidth <= 875;

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
    const { channelId, guildId, code } = router.query;

    router.push({
      pathname: '/discordle/ranking',
      query: {
        channelId,
        guildId,
        code,
      },
    });
  }

  useEffect(() => {
    if (router.isReady) {
      const { channelId, guildId, code } = router.query;

      if (channelId && guildId && code) {
        DiscordGameApi.GetResultDetails(
          guildId.toString(),
          channelId.toString(),
          code.toString()
        ).then((data) => setResultDetails(data));
      }
    }
  }, [router]);

  if (!resultDetails.length) return <Fragment />;

  return (
    <Fragment>
      <Row justify="center">
        <FeatherIcons icon="star" size={26} />
        <S.Subtitle>
          Pontuação final: {score}/{totalScore * 5}
        </S.Subtitle>
      </Row>

      <S.AsideGuildInfo isMobile={isMobile}>
        <S.Span>Próxima atualização em:</S.Span>

        <S.TimerContainer>{timer}</S.TimerContainer>

        <Row justify="end">
          <Description fontSize="10.5pt" fontStyle="italic">
            Atualização todos os dias ás
            <HomeSpan> 23:59 </HomeSpan>
          </Description>
        </Row>
      </S.AsideGuildInfo>

      <S.Divider />

      <Row justify="center">
        {answers
          .sort((a, b) => a.TabKey - b.TabKey)
          .map(({ Score, Success, TabKey }, index) => (
            <S.AnswerContainer key={index} isMobile={isMobile}>
              <S.Row align="middle" justify="center">
                <S.AnswerItem success={Success} score={Score}>
                  <FeatherIcons icon={Success ? 'check' : 'x'} />
                </S.AnswerItem>
                {TabKey}º Mensagem
              </S.Row>

              <MessageContainer
                width="300px"
                minHeigth="350px"
                maxHeigth="350px"
                margin="10px 0 0 0"
                padding="10px"
              >
                <DisplayMessageContainer
                  {...filterMessage(
                    resultDetails[index],
                    MessageLevelEnum.isMain
                  )}
                  fromResult
                  switchValues={switchValues}
                />
              </MessageContainer>
            </S.AnswerContainer>
          ))}
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
          Ranking
        </Button>
      </Row>
    </Fragment>
  );
}
