import React, { useState } from 'react';
import * as S from './styles';
import * as I from './IChoosedMessage';
import type { MenuProps } from 'antd';
import DiscordMessagesApi from 'services/DiscordMessages';
import theme from 'globalStyles/theme';
import filterMessage from 'helpers/filter.message';
import DisplayMessageContainer from 'pages/game/components/DisplayMessageContainer';
import { IChoosedMessage } from './IChoosedMessage';
import {
  Button,
  FeatherIcons,
  Tooltip,
  Dropdown,
  PopConfirm,
} from 'antd_components';
import {
  FilterMessageEnum,
  IFilterMessageResponse,
  MessageLevelEnum,
} from 'helpers/filterMessageEnum';

export default function ChoosedMessage({
  content,
  timestamp,
  id,
  messageType,
  formattedAttachs,
  messageLevel,
}: I.IChoosedMessage) {
  const mainMessage = {
    content,
    timestamp,
    id,
    messageType,
    formattedAttachs,
    messageLevel,
  };
  const [totalMessages, setTotalMessages] = useState<IChoosedMessage[]>([
    mainMessage,
  ]);

  const [stillOpen, setStillOpen] = useState({
    tooltip: false,
    popconfirm: false,
    dropdown: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

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
    if (isPrevious)
      emptyChoosedMessage.messageLevel = MessageLevelEnum.isPrevious;
    else emptyChoosedMessage.messageLevel = MessageLevelEnum.isConsecutive;

    return emptyChoosedMessage;
  }

  function handleGetHints() {
    DiscordMessagesApi.GetDiscordHints(id).then((res) => {
      const messageIndex = res.findIndex((x) => x.id === id);

      const emptyChoosedMessage: IChoosedMessage = {
        content: 'Não foi possível recuperar a mensagem.',
        formattedAttachs: [] as JSX.Element[],
        id: '',
        messageType: [] as FilterMessageEnum[],
        timestamp: '',
        messageLevel: MessageLevelEnum.dontExist,
      };

      let filterResponsePreviousMessage: IFilterMessageResponse =
        {} as IFilterMessageResponse;
      let filterResponseConsecutiveMessage: IFilterMessageResponse =
        {} as IFilterMessageResponse;

      const previousPosition = res[messageIndex - 1];
      const consecutivePosition = res[messageIndex + 1];

      if (previousPosition)
        filterResponsePreviousMessage = filterMessage(previousPosition);

      if (consecutivePosition)
        filterResponseConsecutiveMessage = filterMessage(consecutivePosition);

      const previousMessage: IChoosedMessage = !previousPosition
        ? handleFormattEmptyChoosedMessage(emptyChoosedMessage, true)
        : {
            content: previousPosition.content,
            formattedAttachs: filterResponsePreviousMessage.formattedAttachs,
            id: previousPosition.id,
            messageType: filterResponsePreviousMessage.messageType,
            timestamp: previousPosition.timestamp,
            messageLevel: MessageLevelEnum.isPrevious,
          };

      const consecutiveMessage: IChoosedMessage = !consecutivePosition
        ? handleFormattEmptyChoosedMessage(emptyChoosedMessage, false)
        : {
            content: consecutivePosition.content,
            formattedAttachs: filterResponseConsecutiveMessage.formattedAttachs,
            id: consecutivePosition.id,
            messageType: filterResponseConsecutiveMessage.messageType,
            timestamp: consecutivePosition.timestamp,
            messageLevel: MessageLevelEnum.isConsecutive,
          };

      setTotalMessages([consecutiveMessage, mainMessage, previousMessage]);
    });
  }

  const confirm = () =>
    new Promise(() => {
      setLoading(true);

      setTimeout(() => {
        handleGetHints();

        setLoading(false);
      }, 2000);
    });

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <PopConfirm
          title="Aviso!"
          description="Ao mostrar uma dica, a resposta correta valerá a metade dos pontos normais."
          okText="Mostrar"
          cancelText="Cancelar"
          onConfirm={confirm}
          onCancel={closeAll}
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
            <FeatherIcons icon="star" color={theme.colors.primary} size={20} />
            <S.Hint>Dica</S.Hint>
          </S.OptionItem>
        </PopConfirm>
      ),
    },
  ];

  return (
    <S.MessageContainer>
      {totalMessages.length === 1 && (
        <Tooltip title="Opções" color="#17171a" open={stillOpen.tooltip}>
          <S.Options>
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
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
                      color={theme.colors.primary}
                      size={25}
                    />
                  }
                />
              </a>
            </Dropdown>
          </S.Options>
        </Tooltip>
      )}

      <S.GameTitle>Guess the Idiot</S.GameTitle>

      {totalMessages.map(
        (
          {
            content,
            formattedAttachs,
            messageType,
            timestamp,
            id,
            messageLevel,
          },
          index
        ) => (
          <>
            {messageLevel === MessageLevelEnum.isMain &&
            totalMessages.length > 1 ? (
              <S.MainMessageContainer>
                <DisplayMessageContainer
                  key={index}
                  id={id}
                  content={content}
                  timestamp={timestamp}
                  messageType={messageType}
                  formattedAttachs={formattedAttachs}
                  messageLevel={messageLevel}
                />
              </S.MainMessageContainer>
            ) : (
              <DisplayMessageContainer
                key={index}
                id={id}
                content={content}
                timestamp={timestamp}
                messageType={messageType}
                formattedAttachs={formattedAttachs}
                messageLevel={messageLevel}
              />
            )}
          </>
        )
      )}
    </S.MessageContainer>
  );
}
