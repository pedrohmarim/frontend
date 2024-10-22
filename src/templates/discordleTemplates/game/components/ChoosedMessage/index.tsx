import React, { Fragment, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import * as I from './IChoosedMessage';
import DiscordleGameApi from 'services/DiscordleService/DiscordleGame';
import theme from 'globalStyles/theme';
import filterMessage from 'helpers/discordle/filter.message';
import DisplayMessageContainer from 'templates/discordleTemplates/game/components/DisplayMessageContainer';
import { IChoosedMessage } from './IChoosedMessage';
import { IDiscordHintsRequest } from 'services/DiscordleService/IDiscordleService';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';
import {
  Button,
  FeatherIcons,
  Row,
  PopConfirm,
  Tour,
  Skeleton,
} from 'antd_components';
import {
  MessageTypeEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';

export default function ChoosedMessage({
  openWarnExistsHint,
  authorSelected,
  switchValues,
  usedHint,
  message,
  tabkey,
  score,
  setUsedHint,
  setWarnExistsHint,
}: I.IChoosedMessageComponent) {
  const { i18n, t } = useTranslation('Game');
  const ref = useRef(null);
  const router = useRouter();
  const { windowWidth } = useMyContext();
  const isMobile = windowWidth <= 875;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingHint, setLoadingHint] = useState<boolean>(usedHint);
  const [openPopConfirm, setOpenPopConfirm] = useState(false);
  const [totalMessages, setTotalMessages] = useState<IChoosedMessage[]>([
    message,
  ]);

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

  function handleGetHints(fromClick?: boolean) {
    if (router.isReady) {
      setLoadingHint(true);
      setTotalMessages([{} as IChoosedMessage, message, {} as IChoosedMessage]);

      const { channelId, guildId, code } = router.query;

      if (!channelId || !guildId || !code) return;

      const dto: IDiscordHintsRequest = {
        MessageId: message.id,
        AuthorSelected: authorSelected,
        ChannelId: channelId.toString(),
        Code: code.toString(),
        GuildId: guildId.toString(),
        TabKey: tabkey,
        FromClick: fromClick ?? false,
      };

      DiscordleGameApi.GetDiscordHints(dto)
        .then(({ ConsecutivePosition, PreviousPosition }) => {
          let previousMessage = {} as I.IChoosedMessage;
          let consecutiveMessage = {} as I.IChoosedMessage;

          if (PreviousPosition) {
            previousMessage = filterMessage(
              PreviousPosition,
              MessageLevelEnum.isPrevious
            );
          } else {
            previousMessage.content = t('previousMessageNotFound');
            previousMessage.messageLevel = MessageLevelEnum.isPrevious;
            previousMessage.messageType = MessageTypeEnum.isText;
          }

          if (ConsecutivePosition) {
            consecutiveMessage = filterMessage(
              ConsecutivePosition,
              MessageLevelEnum.isConsecutive
            );
          } else {
            consecutiveMessage.content = t('consecutiveMessageNotFound');
            consecutiveMessage.messageLevel = MessageLevelEnum.isConsecutive;
            consecutiveMessage.messageType = MessageTypeEnum.isText;
          }

          setTotalMessages([consecutiveMessage, message, previousMessage]);
        })
        .finally(() => setLoadingHint(false));
    }
  }

  useEffect(() => {
    if (usedHint) handleGetHints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirm = () =>
    new Promise(() => {
      setLoading(true);

      setTimeout(() => {
        setUsedHint(true);
        handleGetHints(true);

        setLoading(false);
      }, 2000);
    });

  return (
    <Fragment>
      <Tour
        open={openWarnExistsHint}
        placement="top"
        onClose={() => setWarnExistsHint(!openWarnExistsHint)}
        steps={[
          {
            title: t('tourTitle'),
            description: t('tourDescription'),
            closable: true,
            onClose: () => setWarnExistsHint(false),
            nextButtonProps: {
              children: t('confirmTour'),
              style: {
                backgroundColor: theme.discordleColors.primary,
                color: theme.discordleColors.text,
              },
            },
            target: () => ref.current,
          },
        ]}
      />

      <Row
        justify="center"
        align="middle"
        style={{
          marginBottom: isMobile && usedHint ? '20px' : '0',
          position: 'relative',
        }}
      >
        <Skeleton
          paragraph={false}
          style={{ width: '600px', marginBottom: '30px' }}
          active={!Boolean(switchValues && switchValues.PointsPerCorrectAnswer)}
          loading={
            !Boolean(switchValues && switchValues.PointsPerCorrectAnswer)
          }
        >
          {switchValues && (
            <S.ScoreTextContainer isMobile={isMobile} usedHint={usedHint}>
              <S.ScoreText>
                {t('score')} {score}/{switchValues.PointsPerCorrectAnswer * 5}
              </S.ScoreText>
            </S.ScoreTextContainer>
          )}
        </Skeleton>

        <S.HintContainer ref={ref} isMobile={windowWidth <= 500}>
          {totalMessages.length === 1 && (
            <PopConfirm
              title={
                <>
                  {t('popConfirm1')}
                  <br></br>
                  {t('popConfirm2')}
                </>
              }
              okText={t('popConfirmShow')}
              cancelText={t('cancel')}
              onConfirm={confirm}
              getPopupContainer={(trigger) => trigger}
              onCancel={() => setOpenPopConfirm(false)}
              placement="left"
              open={openPopConfirm || loading}
              overlayStyle={{
                backgroundColor: theme.discordleColors.background,
                borderRadius: '5px',
              }}
              overlayInnerStyle={{
                border: 'solid 2px rgba(138, 0, 194, 0.5)',
                width: '360px',
                backgroundColor: theme.discordleColors.background,
              }}
              okButtonProps={{
                style: {
                  backgroundColor: theme.discordleColors.primary,
                  border: 'none',
                },
              }}
              cancelButtonProps={{
                style: {
                  backgroundColor: theme.discordleColors.text,
                  color: theme.discordleColors.primary,
                },
              }}
            >
              <Button
                onClick={() => setOpenPopConfirm(true)}
                color={theme.discordleColors.text}
                backgroundcolor={theme.discordleColors.primary}
                height={33}
                width={isMobile ? '' : 'fit-content'}
                icon={
                  <FeatherIcons
                    icon="message-circle"
                    color={theme.discordleColors.text}
                    size={20}
                  />
                }
              >
                {!isMobile ? t('showHint') : t('hint')}
              </Button>
            </PopConfirm>
          )}
        </S.HintContainer>
      </Row>

      {totalMessages.map((message, index) => {
        const isMainMessage = message.messageLevel === MessageLevelEnum.isMain;

        return (
          <S.Container key={index}>
            <Skeleton
              active={!isMainMessage && usedHint && loadingHint}
              loading={!isMainMessage && usedHint && loadingHint}
              style={{ width: '650px', marginBottom: '10px' }}
            >
              {isMainMessage ? (
                <S.MainMessageContainer>
                  <DisplayMessageContainer
                    {...message}
                    switchValues={switchValues}
                  />
                </S.MainMessageContainer>
              ) : (
                <DisplayMessageContainer
                  {...message}
                  switchValues={switchValues}
                />
              )}
            </Skeleton>
          </S.Container>
        );
      })}
    </Fragment>
  );
}
