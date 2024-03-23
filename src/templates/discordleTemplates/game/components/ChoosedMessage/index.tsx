import React, { useEffect, useState } from 'react';
import * as S from './styles';
import * as I from './IChoosedMessage';
import DiscordleGameApi from 'services/DiscordleService/DiscordleGame';
import theme from 'globalStyles/theme';
import filterMessage from 'helpers/discordle/filter.message';
import DisplayMessageContainer from 'templates/discordleTemplates/game/components/DisplayMessageContainer';
import { IChoosedMessage } from './IChoosedMessage';
import { IDiscordHintsRequest } from 'services/DiscordleService/IDiscordleService';
import { useRouter } from 'next/router';
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';
import {
  Button,
  FeatherIcons,
  Tooltip,
  Dropdown,
  Avatar,
  Row,
} from 'antd_components';

export default function ChoosedMessage({
  message,
  score,
  tabkey,
  authorSelected,
  serverName,
  usedHint,
  serverIcon,
  items,
  stillOpen,
  loading,
  setStillOpen,
}: I.IChoosedMessageComponent) {
  const router = useRouter();

  const [totalMessages, setTotalMessages] = useState<IChoosedMessage[]>([
    message,
  ]);

  function handleGetHints() {
    if (router.isReady) {
      const { channelId, guildId } = router.query;

      if (!channelId || !guildId) return;

      const dto: IDiscordHintsRequest = {
        MessageId: message.id,
        AuthorSelected: authorSelected,
        ChannelId: channelId.toString(),
        GuildId: guildId.toString(),
        TabKey: tabkey,
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
              'Não existe uma mensagem consecutiva à escolhida.';
            previousMessage.messageLevel = MessageLevelEnum.isPrevious;
          }
          if (ConsecutivePosition) {
            consecutiveMessage = filterMessage(
              ConsecutivePosition,
              MessageLevelEnum.isConsecutive
            );
          } else {
            consecutiveMessage.content =
              'Não existe uma mensagem anterior à escolhida.';
            consecutiveMessage.messageLevel = MessageLevelEnum.isConsecutive;
          }

          setTotalMessages([consecutiveMessage, message, previousMessage]);
        }
      );
    }
  }

  useEffect(() => {
    if (usedHint) handleGetHints();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedHint]);

  return (
    <S.PaddingContainer>
      <S.ScoreContainer>
        <FeatherIcons icon="star" size={18} />
        <S.ScoreText> Pontuação: {score}/10</S.ScoreText>
      </S.ScoreContainer>

      {totalMessages.length === 1 && (
        <Tooltip title="Opções" color="#17171a" open={stillOpen.tooltip}>
          <S.Options>
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={window.innerWidth < 450 ? ['click'] : ['hover', 'click']}
              open={stillOpen.dropdown || loading}
              onOpenChange={(open) =>
                setStillOpen({
                  popconfirm: !open ? false : stillOpen.popconfirm,
                  tooltip: open && !stillOpen.popconfirm,
                  dropdown: open,
                })
              }
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button
                  type="ghost"
                  icon={
                    <FeatherIcons
                      icon="more-vertical"
                      color={theme.discordleColors.primary}
                      size={25}
                    />
                  }
                />
              </a>
            </Dropdown>
          </S.Options>
        </Tooltip>
      )}

      <S.BiggerGameTitle>Discordle</S.BiggerGameTitle>

      <Row justify="center" align="middle">
        <Avatar src={serverIcon} />
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
          };

          return (
            <S.Container key={index}>
              {message.messageLevel === MessageLevelEnum.isMain &&
              totalMessages.length > 1 ? (
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
