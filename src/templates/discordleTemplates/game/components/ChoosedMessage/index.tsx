import React, { Fragment, useEffect, useState } from 'react';
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
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';
import {
  Button,
  FeatherIcons,
  Tooltip,
  Dropdown,
  Avatar,
  Row,
  PopConfirm,
} from 'antd_components';

export default function ChoosedMessage({
  score,
  tabkey,
  isOwner,
  message,
  usedHint,
  openModal,
  serverName,
  serverIcon,
  switchValues,
  authorSelected,
  setUsedHint,
  setOpenModal,
}: I.IChoosedMessageComponent) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [totalMessages, setTotalMessages] = useState<IChoosedMessage[]>([
    message,
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

  const items: MenuProps['items'] = [];

  if (totalMessages.length === 1) {
    items.push({
      key: '1',
      label: (
        <PopConfirm
          title="Aviso! Ao mostrar uma dica, a resposta correta valerá 1 ponto ao invés de 2."
          okText="Mostrar"
          cancelText="Cancelar"
          onConfirm={confirm}
          getPopupContainer={(trigger) => trigger}
          onCancel={closeAll}
          placement="right"
          open={stillOpen.popconfirm || loading}
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
    });
  }

  if (isOwner)
    items.push({
      key: '2',
      label: (
        <S.OptionItem
          align="middle"
          onClick={() => {
            setStillOpen({
              popconfirm: false,
              tooltip: false,
              dropdown: false,
            });

            setOpenModal(!openModal);
          }}
        >
          <FeatherIcons
            icon="settings"
            color={theme.discordleColors.primary}
            size={20}
          />
          <S.Hint>Configurações</S.Hint>
        </S.OptionItem>
      ),
    });

  return (
    <S.PaddingContainer>
      <S.ScoreContainer>
        <FeatherIcons icon="star" size={18} />
        <S.ScoreText>
          {switchValues && (
            <Fragment>
              Pontuação: {score}/{switchValues.PointsPerCorrectAnswer * 5}
            </Fragment>
          )}
        </S.ScoreText>
      </S.ScoreContainer>

      {items.length > 0 && (
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
