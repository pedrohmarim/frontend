import React, { useEffect, useState } from 'react';
import * as S from './styles';
import * as I from './IChoosedMessage';
import type { MenuProps } from 'antd';
import DiscordleGameApi from 'services/DiscordleService/DiscordleGame';
import theme from 'globalStyles/theme';
import filterMessage from 'helpers/discordle/filter.message';
import DisplayMessageContainer from 'templates/discordleTemplates/game/components/DisplayMessageContainer';
import { IChoosedMessage } from './IChoosedMessage';
import { IDiscordHintsRequest } from 'services/DiscordleService/IDiscordleService';
import { useRouter } from 'next/router';
import {
  FilterMessageEnum,
  IFilterMessageResponse,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';
import {
  Button,
  FeatherIcons,
  Tooltip,
  Dropdown,
  PopConfirm,
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
  setUsedHint,
}: I.IChoosedMessageComponent) {
  const router = useRouter();

  const {
    content,
    timestamp,
    id,
    messageType,
    formattedAttachs,
    messageLevel,
    urlLink,
  } = message;

  const mainMessage = {
    content,
    timestamp,
    id,
    messageType,
    formattedAttachs,
    messageLevel,
    urlLink,
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [totalMessages, setTotalMessages] = useState<IChoosedMessage[]>([
    mainMessage,
  ]);

  const [stillOpen, setStillOpen] = useState({
    tooltip: false,
    popconfirm: false,
    dropdown: false,
  });

  function closeAll() {
    setStillOpen({
      tooltip: false,
      popconfirm: false,
      dropdown: false,
    });
  }

  function handleFormattEmptyChoosedMessage(
    emptyChoosedMessage: IChoosedMessage,
    isPrevious: boolean
  ) {
    if (isPrevious) {
      emptyChoosedMessage.content =
        'Não existe uma mensagem consecutiva à escolhida.';
      emptyChoosedMessage.messageLevel = MessageLevelEnum.isPrevious;
    } else {
      emptyChoosedMessage.content =
        'Não existe uma mensagem anterior à escolhida.';
      emptyChoosedMessage.messageLevel = MessageLevelEnum.isConsecutive;
    }

    return emptyChoosedMessage;
  }

  function handleGetHints() {
    if (router.isReady) {
      const { channelId, guildId } = router.query;

      if (!channelId || !guildId) return;

      const dto: IDiscordHintsRequest = {
        MessageId: id,
        AuthorSelected: authorSelected,
        ChannelId: channelId.toString(),
        GuildId: guildId.toString(),
        TabKey: tabkey,
      };

      DiscordleGameApi.GetDiscordHints(dto).then(
        ({ ConsecutivePosition, PreviousPosition }) => {
          const emptyChoosedMessage: IChoosedMessage = {
            content: '',
            formattedAttachs: [] as JSX.Element[],
            id: '',
            urlLink: '',
            messageType: FilterMessageEnum.isText,
            timestamp: '',
            messageLevel: MessageLevelEnum.dontExist,
          };

          let filterResponsePreviousMessage: IFilterMessageResponse =
            {} as IFilterMessageResponse;

          if (PreviousPosition)
            filterResponsePreviousMessage = filterMessage(PreviousPosition);

          const previousMessage: IChoosedMessage = !PreviousPosition
            ? handleFormattEmptyChoosedMessage(emptyChoosedMessage, true)
            : {
                content: PreviousPosition.Content,
                formattedAttachs:
                  filterResponsePreviousMessage.formattedAttachs,
                urlLink: filterResponsePreviousMessage.urlLink,
                id: PreviousPosition.Id,
                messageType: filterResponsePreviousMessage.messageType,
                timestamp: PreviousPosition.Timestamp,
                messageLevel: MessageLevelEnum.isPrevious,
              };

          let filterResponseConsecutiveMessage: IFilterMessageResponse =
            {} as IFilterMessageResponse;

          if (ConsecutivePosition)
            filterResponseConsecutiveMessage =
              filterMessage(ConsecutivePosition);

          const consecutiveMessage: IChoosedMessage = !ConsecutivePosition
            ? handleFormattEmptyChoosedMessage(emptyChoosedMessage, false)
            : {
                content: ConsecutivePosition.Content,
                formattedAttachs:
                  filterResponseConsecutiveMessage.formattedAttachs,
                urlLink: filterResponseConsecutiveMessage.urlLink,
                id: ConsecutivePosition.Id,
                messageType: filterResponseConsecutiveMessage.messageType,
                timestamp: ConsecutivePosition.Timestamp,
                messageLevel: MessageLevelEnum.isConsecutive,
              };

          setTotalMessages([consecutiveMessage, mainMessage, previousMessage]);
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
        handleGetHints();

        setLoading(false);
      }, 2000);
    });

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <PopConfirm
          title="Aviso! Ao mostrar uma dica, a resposta correta valerá 1 ponto ao invés de 2."
          okText="Mostrar"
          cancelText="Cancelar"
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
          onConfirm={confirm}
          getPopupContainer={(trigger) => trigger}
          onCancel={closeAll}
          placement="bottom"
          open={stillOpen.popconfirm || loading}
        >
          <S.OptionItem
            align="middle"
            onClick={() =>
              setStillOpen({
                popconfirm: true,
                tooltip: false,
                dropdown: true,
              })
            }
          >
            <FeatherIcons
              icon="star"
              color={theme.discordleColors.primary}
              size={20}
            />
            <S.Hint>Dica</S.Hint>
          </S.OptionItem>
        </PopConfirm>
      ),
    },
  ];

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
            content: content,
            formattedAttachs: formattedAttachs,
            messageType: messageType,
            timestamp: timestamp,
            id: id,
            messageLevel: messageLevel,
            urlLink: urlLink,
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
          };

          return (
            <S.Container key={index}>
              {messageLevel === MessageLevelEnum.isMain &&
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
