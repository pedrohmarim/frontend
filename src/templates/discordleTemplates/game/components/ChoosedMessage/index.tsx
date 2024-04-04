import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import * as I from './IChoosedMessage';
import DiscordleGameApi from 'services/DiscordleService/DiscordleGame';
import theme from 'globalStyles/theme';
import filterMessage from 'helpers/discordle/filter.message';
import DisplayMessageContainer from 'templates/discordleTemplates/game/components/DisplayMessageContainer';
import { IChoosedMessage } from './IChoosedMessage';
import { IDiscordHintsRequest } from 'services/DiscordleService/IDiscordleService';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  MessageTypeEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';
import {
  Button,
  FeatherIcons,
  Row,
  PopConfirm,
  Tour,
  Tooltip,
} from 'antd_components';

export default function ChoosedMessage({
  score,
  tabkey,
  isOwner,
  message,
  openTour,
  usedHint,
  openModal,
  serverName,
  serverIcon,
  switchValues,
  authorSelected,
  setUsedHint,
  setOpenTour,
  setOpenModal,
}: I.IChoosedMessageComponent) {
  const router = useRouter();

  const ref = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openPopConfirm, setOpenPopConfirm] = useState(false);
  const [totalMessages, setTotalMessages] = useState<IChoosedMessage[]>([
    message,
  ]);

  function handleGetHints(fromClick?: boolean) {
    if (router.isReady) {
      const { channelId, guildId } = router.query;

      if (!channelId || !guildId) return;

      const dto: IDiscordHintsRequest = {
        MessageId: message.id,
        AuthorSelected: authorSelected,
        ChannelId: channelId.toString(),
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
    <S.PaddingContainer>
      <S.ScoreContainer align="middle" justify="space-between">
        <S.ScoreTextContainer>
          {switchValues && (
            <S.ScoreText>
              Pontuação: {score}/{switchValues.PointsPerCorrectAnswer * 5}
            </S.ScoreText>
          )}
        </S.ScoreTextContainer>

        <Row>
          {totalMessages.length === 1 && (
            <PopConfirm
              title="Aviso! Ao mostrar uma dica, a resposta correta valerá 1 ponto ao invés de 2."
              okText="Mostrar"
              cancelText="Cancelar"
              onConfirm={confirm}
              getPopupContainer={(trigger) => trigger}
              onCancel={() => setOpenPopConfirm(false)}
              placement="bottom"
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
                  ref={ref}
                  onClick={() => setOpenPopConfirm(true)}
                  width={85}
                  backgroundcolor="transparent"
                  height={33}
                  icon={
                    <FeatherIcons
                      icon="message-circle"
                      color={theme.discordleColors.text}
                      size={20}
                    />
                  }
                />
              </Tooltip>
            </PopConfirm>
          )}

          {isOwner && (
            <Tooltip title="Configurações">
              <Button
                onClick={() => setOpenModal(!openModal)}
                height={33}
                margin="0 0 0 10px"
                backgroundcolor="transparent"
                icon={
                  <FeatherIcons
                    icon="settings"
                    color={theme.discordleColors.text}
                    size={20}
                  />
                }
              />
            </Tooltip>
          )}
        </Row>
      </S.ScoreContainer>

      <Tour
        open={openTour}
        onClose={() => setOpenTour(!openTour)}
        steps={[
          {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref.current,
          },
        ]}
      />

      <S.BiggerGameTitle>Discordle</S.BiggerGameTitle>

      <Row justify="center" align="middle">
        <Image
          src={serverIcon}
          alt="img"
          width={38}
          height={38}
          style={{ borderRadius: '50%' }}
        />
        <S.ServerName>{serverName}</S.ServerName>
      </Row>

      {totalMessages.map(
        (
          {
            content,
            formattedAttachs,
            messageType,
            timestamp,
            id,
            messageLevel,
            urlLink,
            referencedMessage,
            author,
          },
          index
        ) => {
          const props = {
            content,
            formattedAttachs,
            messageType,
            timestamp,
            id,
            messageLevel,
            urlLink,
            key: index,
            referencedMessage,
            author,
            switchValues,
          };

          return (
            <S.Container key={index}>
              {messageLevel === MessageLevelEnum.isMain ? (
                <S.MainMessageContainer>
                  <DisplayMessageContainer {...props} />
                </S.MainMessageContainer>
              ) : (
                <DisplayMessageContainer {...props} />
              )}
            </S.Container>
          );
        }
      )}
    </S.PaddingContainer>
  );
}
