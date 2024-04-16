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
import {
  MessageTypeEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';
import {
  Button,
  FeatherIcons,
  Row,
  PopConfirm,
  Tooltip,
  Tour,
} from 'antd_components';

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
  const ref = useRef(null);
  const router = useRouter();
  const { windowWidth } = useMyContext();
  const isMobile = windowWidth <= 875;
  const [loading, setLoading] = useState<boolean>(false);
  const [openPopConfirm, setOpenPopConfirm] = useState(false);
  const [totalMessages, setTotalMessages] = useState<IChoosedMessage[]>([
    message,
  ]);

  function handleGetHints(fromClick?: boolean) {
    if (router.isReady) {
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

      DiscordleGameApi.GetDiscordHints(dto).then(
        ({ ConsecutivePosition, PreviousPosition }) => {
          let previousMessage = {} as I.IChoosedMessage;
          let consecutiveMessage = {} as I.IChoosedMessage;

          if (PreviousPosition) {
            previousMessage = filterMessage(
              PreviousPosition,
              MessageLevelEnum.isPrevious
            );
          } else {
            previousMessage.content =
              'Não existe uma mensagem anterior à escolhida.';
            previousMessage.messageLevel = MessageLevelEnum.isPrevious;
            previousMessage.messageType = MessageTypeEnum.isText;
          }

          if (ConsecutivePosition) {
            consecutiveMessage = filterMessage(
              ConsecutivePosition,
              MessageLevelEnum.isConsecutive
            );
          } else {
            consecutiveMessage.content =
              'Não existe uma mensagem consecutiva à escolhida.';
            consecutiveMessage.messageLevel = MessageLevelEnum.isConsecutive;
            consecutiveMessage.messageType = MessageTypeEnum.isText;
          }

          setTotalMessages([consecutiveMessage, message, previousMessage]);
        }
      );
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
            title: 'Mensagem muito difícil?',
            description: 'Experimente usar uma dica. 😁',
            closable: true,
            onClose: () => setWarnExistsHint(false),
            nextButtonProps: {
              children: 'Entendido',
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
        {switchValues && (
          <S.ScoreTextContainer isMobile={isMobile}>
            <S.ScoreText>
              Pontuação: {score}/{switchValues.PointsPerCorrectAnswer * 5}
            </S.ScoreText>
          </S.ScoreTextContainer>
        )}

        <S.HintContainer ref={ref}>
          {totalMessages.length === 1 && (
            <PopConfirm
              title="Aviso! Ao mostrar uma dica, a resposta correta valerá 1 ponto ao invés de 2."
              okText="Mostrar"
              cancelText="Cancelar"
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
              <Tooltip title="Mostrar Dica">
                <Button
                  onClick={() => setOpenPopConfirm(true)}
                  color={theme.discordleColors.text}
                  backgroundcolor={theme.discordleColors.primary}
                  height={33}
                  width="fit-content"
                  icon={
                    <FeatherIcons
                      icon="message-circle"
                      color={theme.discordleColors.text}
                      size={20}
                    />
                  }
                >
                  {!isMobile ? 'Mostrar Dica' : 'Dica'}
                </Button>
              </Tooltip>
            </PopConfirm>
          )}
        </S.HintContainer>
      </Row>

      {totalMessages.map((message, index) => (
        <S.Container key={index}>
          {message.messageLevel === MessageLevelEnum.isMain ? (
            <S.MainMessageContainer>
              <DisplayMessageContainer
                {...message}
                switchValues={switchValues}
              />
            </S.MainMessageContainer>
          ) : (
            <DisplayMessageContainer {...message} switchValues={switchValues} />
          )}
        </S.Container>
      ))}
    </Fragment>
  );
}
