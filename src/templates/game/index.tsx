import React, { useCallback, useState, useEffect } from 'react';
import { Spin } from 'antd_components';
import * as I from 'services/DiscordMessages/IDiscordMessagesService';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordMessages';
import theme from 'globalStyles/theme';
import Head from 'next/head';
import filterMessage from 'helpers/filter.message';
import ChoosedMessage from './components/ChoosedMessage';
import AuthorSelect from './components/AuthorSelect';
import {
  IFilterMessageResponse,
  MessageLevelEnum,
} from 'helpers/filterMessageEnum';

export default function GameContainer() {
  const [messages, setMessages] = useState<I.IMessage[]>();
  const [choosedMessage, setChoosedMessage] = useState<I.IMessage>();
  const [authors, setAuthors] = useState<string[]>();
  const [filterResponse, setFilterResponse] = useState(
    {} as IFilterMessageResponse
  );

  const range = (start: number, end: number): number =>
    Math.floor(Math.random() * (end - start + 1)) + start;

  const times = range(1, 5);

  const handleGetPreviousMessageArray = useCallback(async (id: string) => {
    return await DiscordMessagesApi.GetDiscordPreviousMessages(id);
  }, []);

  function handleDistinctAuthorArray(messages: I.IMessage[]): string[] {
    const authors: string[] = [];

    messages.forEach(({ author }) => {
      const { username } = author;
      authors.push(username);
    });

    return authors.filter(
      (value, index, array) => array.indexOf(value) === index
    );
  }

  function verifyMessage(content: string): boolean {
    let allEqual = true;

    content.split('').forEach((caractere) => {
      if (caractere !== content[0]) {
        allEqual = false;
      }
    });

    return allEqual;
  }

  async function getLastElementRecursive(
    arr: I.IMessage[],
    rangeNumber: number
  ): Promise<I.IMessage> {
    const randomPosition = range(0, arr.length - 1);

    const message = arr[randomPosition];

    const isSticker = message.sticker_items?.length;
    const isServerEmoji = message.content.includes('<:');
    const hasOnlyOneMention = message.content.split('<@').length - 1 === 1;
    const notShortMessage = message.content.length > 5;
    const allEqualCharacters = verifyMessage(message.content);

    const isValidMessage =
      rangeNumber === 0 &&
      !isSticker &&
      !isServerEmoji &&
      !hasOnlyOneMention &&
      !allEqualCharacters &&
      notShortMessage;

    if (isValidMessage) {
      setFilterResponse(filterMessage(message));

      const unique_authors = handleDistinctAuthorArray(arr);
      setAuthors(unique_authors);

      return message;
    } else {
      const lastElementId = arr[arr.length - 1].id;

      const previousArray = await handleGetPreviousMessageArray(lastElementId);

      return getLastElementRecursive(
        previousArray,
        rangeNumber === 0 ? times - 1 : rangeNumber - 1
      );
    }
  }

  useEffect(() => {
    DiscordMessagesApi.GetDiscordMessages().then(async (data) =>
      setMessages(data)
    );
  }, []);

  const getLastElementRecursiveCallBack = useCallback(() => {
    if (!messages?.length) return;

    getLastElementRecursive(messages, times).then((data) =>
      setChoosedMessage(data)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    getLastElementRecursiveCallBack();
  }, [getLastElementRecursiveCallBack, messages]);

  return (
    <>
      <Head>
        <title>Guess the Idiot | Game</title>
      </Head>

      {authors && choosedMessage ? (
        <S.ColumnContainer>
          <ChoosedMessage
            messageLevel={MessageLevelEnum.isMain}
            content={choosedMessage.content}
            timestamp={choosedMessage.timestamp}
            id={choosedMessage.id}
            formattedAttachs={filterResponse.formattedAttachs}
            messageType={filterResponse.messageType}
          />

          <AuthorSelect
            authorMessage={choosedMessage.author.username}
            authorsOptions={authors}
          />
        </S.ColumnContainer>
      ) : (
        <Spin
          color={theme.colors.text}
          tip="Escolhendo uma linda mensagem ..."
        />
      )}
    </>
  );
}
