import React, { useState, useEffect, Fragment } from 'react';
import { Button, Skeleton } from 'antd_components';
import { Row, FeatherIcons } from 'antd_components';
import { useRouter } from 'next/router';
import * as S from './styles';
import * as I from './IResult';
import Timer from 'templates/discordleTemplates/globalComponents/timer';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import theme from 'globalStyles/theme';
import { HomeSpan, MessageContainer } from 'globalStyles/global';
import { Description } from 'templates/discordleTemplates/home/components/SelectChanneInstanceModal/styles';
import { useMyContext } from 'Context';
import filterMessage from 'helpers/discordle/filter.message';
import { IMessage } from 'services/DiscordleService/IDiscordleService';
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';
import DisplayMessageContainer from '../DisplayMessageContainer';
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';

export default function Result({
  answers,
  totalScore,
  switchValues,
}: I.IResult) {
  const { i18n, t } = useTranslation('Game');

  const router = useRouter();
  const [resultDetails, setResultDetails] = useState<IMessage[]>([]);
  const [guildInfoLoading, setGuildInfoLoading] = useState<boolean>(true);
  const { windowWidth } = useMyContext();
  const isMobile = windowWidth <= 875;

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

  const score = answers.reduce((accumulator, curValue) => {
    return accumulator + curValue.Score;
  }, 0);

  function toRanking() {
    const { channelId, guildId, code } = router.query;

    router.push({
      pathname: '/discordle/ranking',
      query: {
        guildId,
        channelId,
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
        )
          .then((data) => setResultDetails(data))
          .finally(() => setGuildInfoLoading(false));
      }
    }
  }, [router]);

  function handleTitle(tabKey: number) {
    const language = getItem('i18nextLng');

    if (language === 'pt-BR') return `${tabKey}º ${t('message')}`;

    if (tabKey === 1) return `1st ${t('message')}`;
    if (tabKey === 2) return `2nd ${t('message')}`;
    if (tabKey === 3) return `3rd ${t('message')}`;
    if (tabKey === 4) return `4th ${t('message')}`;
    if (tabKey === 5) return `5th ${t('message')}`;
  }

  if (!resultDetails.length) return <Fragment />;

  return (
    <Fragment>
      <Skeleton loading={guildInfoLoading} active={guildInfoLoading}>
        <Skeleton
          paragraph={false}
          style={{ width: '300px', marginBottom: '25px' }}
          loading={!Boolean(totalScore)}
          active={!Boolean(totalScore)}
        >
          {totalScore && (
            <Row justify="center">
              <FeatherIcons icon="star" size={26} />
              <S.Subtitle>
                {t('finalScore')} {score}/{totalScore * 5}
              </S.Subtitle>
            </Row>
          )}
        </Skeleton>

        <S.Container isMobile={isMobile}>
          <S.Span>{t('nextUpdate')}</S.Span>

          <S.TimerContainer>
            <Timer />
          </S.TimerContainer>

          <Row justify="end">
            <Description fontSize="10.5pt" fontStyle="italic">
              {t('descriptionUpdate')}
              <HomeSpan> 23:59PM (America/Sao_Paulo). </HomeSpan>
            </Description>
          </Row>
        </S.Container>
      </Skeleton>

      <S.Divider />

      <Row justify="center">
        <Button
          width={150}
          backgroundcolor={theme.discordleColors.primary}
          color={theme.discordleColors.text}
          onClick={toRanking}
          icon={<FeatherIcons icon="award" size={20} />}
        >
          {t('ranking')}
        </Button>
      </Row>

      <S.Divider />

      <Skeleton loading={guildInfoLoading} active={guildInfoLoading}>
        <Row justify="center">
          {answers
            .sort((a, b) => a.TabKey - b.TabKey)
            .map(({ Score, Success, TabKey }, index) => (
              <S.AnswerContainer key={index} isMobile={isMobile}>
                <S.Row align="middle" justify="center">
                  <S.AnswerItem success={Success} score={Score}>
                    <FeatherIcons icon={Success ? 'check' : 'x'} />
                  </S.AnswerItem>
                  {handleTitle(TabKey)}
                </S.Row>

                <MessageContainer
                  width="300px"
                  minHeigth="350px"
                  maxHeigth="350px"
                  margin="10px 0 0 0"
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
      </Skeleton>
    </Fragment>
  );
}
