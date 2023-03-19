import React, { useState } from 'react';
import * as S from './styles';
import * as I from './IChoosedMessage';
import type { MenuProps } from 'antd';
import DiscordMessagesApi from 'services/DiscordMessages';
import theme from 'globalStyles/theme';
import filterMessage from 'helpers/filter.message';
import DisplayMessageContainer from 'templates/game/components/DisplayMessageContainer';
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
  urlLink,
}: I.IChoosedMessage) {
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
    DiscordMessagesApi.GetDiscordHints(id).then(
      ({ consecutivePosition, previousPosition }) => {
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

        if (previousPosition)
          filterResponsePreviousMessage = filterMessage(previousPosition);

        const previousMessage: IChoosedMessage = !previousPosition
          ? handleFormattEmptyChoosedMessage(emptyChoosedMessage, true)
          : {
              content: previousPosition.content,
              formattedAttachs: filterResponsePreviousMessage.formattedAttachs,
              urlLink: filterResponsePreviousMessage.urlLink,
              id: previousPosition.id,
              messageType: filterResponsePreviousMessage.messageType,
              timestamp: previousPosition.timestamp,
              messageLevel: MessageLevelEnum.isPrevious,
            };

        let filterResponseConsecutiveMessage: IFilterMessageResponse =
          {} as IFilterMessageResponse;

        if (consecutivePosition)
          filterResponseConsecutiveMessage = filterMessage(consecutivePosition);

        const consecutiveMessage: IChoosedMessage = !consecutivePosition
          ? handleFormattEmptyChoosedMessage(emptyChoosedMessage, false)
          : {
              content: consecutivePosition.content,
              formattedAttachs:
                filterResponseConsecutiveMessage.formattedAttachs,
              urlLink: filterResponseConsecutiveMessage.urlLink,
              id: consecutivePosition.id,
              messageType: filterResponseConsecutiveMessage.messageType,
              timestamp: consecutivePosition.timestamp,
              messageLevel: MessageLevelEnum.isConsecutive,
            };

        setTotalMessages([consecutiveMessage, mainMessage, previousMessage]);
      }
    );
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
            urlLink,
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
            <>
              {messageLevel === MessageLevelEnum.isMain &&
              totalMessages.length > 1 ? (
                <S.MainMessageContainer>
                  <DisplayMessageContainer {...props} />
                </S.MainMessageContainer>
              ) : (
                <DisplayMessageContainer {...props} />
              )}
            </>
          );
        }
      )}
    </S.MessageContainer>
  );
}
