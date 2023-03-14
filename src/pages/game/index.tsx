import React, { useCallback, useState, useEffect } from 'react';
import { Row, Select, Image, Spin } from 'antd_components';
import * as I from 'services/DiscordMessages/IDiscordMessagesService';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordMessages';
import theme from 'globalStyles/theme';
import HugoPic from 'assets/hugo.jpg';
import AfonsoPic from 'assets/afonso.png';
import LuisPic from 'assets/luis.jpg';
import PodrePic from 'assets/podre.png';
import LuisaPic from 'assets/luisa.png';
import BiaPic from 'assets/bia.png';
import CaoPic from 'assets/cao.png';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function GameContainer() {
  const router = useRouter();
  const [messages, setMessages] = useState<I.IMessage[]>();
  const [choosedMessage, setChoosedMessage] = useState<I.IMessage>();
  const [authors, setAuthors] = useState<string[]>();

  const range = (start: number, end: number) => {
    const result = Math.floor(Math.random() * (end - start + 1)) + start;

    return result;
  };

  const times = range(1, 5);

  const handleGetPreviousMessageArray = useCallback(async (id: string) => {
    return await DiscordMessagesApi.GetDiscordPreviousMessages(id);
  }, []);

  function handleDistinctAuthorArray(messages: I.IMessage[]) {
    const authors: string[] = [];

    messages.forEach(({ author }) => {
      const { username } = author;
      authors.push(username);
    });

    return authors.filter(
      (value, index, array) => array.indexOf(value) === index
    );
  }

  async function getLastElementRecursive(
    arr: I.IMessage[],
    rangeNumber: number
  ): Promise<I.IMessage> {
    const randomPosition = range(0, arr.length - 1);

    const message = arr[randomPosition];

    if (
      rangeNumber === 0 &&
      message.content.length > 20 &&
      !message.content.includes('<:')
    ) {
      const formattedAttachments: JSX.Element[] = [];

      if (message.attachments.length) {
        message.attachments.forEach(({ url, height, width }, index) => {
          formattedAttachments.push(
            <Image
              preview={false}
              src={url}
              height={height > 400 ? 400 : height}
              width={width > 400 ? 400 : width}
              alt={`image_${index}`}
            />
          );
        });
      }

      if (message.content.includes('https://'))
        formattedAttachments.push(
          <a href={message.content} key={1} target="_blank" rel="noreferrer">
            {message.content}
          </a>
        );

      message.formattedAttachments = formattedAttachments;

      if (message.content.includes('<@')) {
        const mentions: string[] = [];

        message.mentions.forEach(({ username }) =>
          mentions.push(`@${username} `)
        );

        message.formattedMentions = mentions;
      }

      if (message.content.includes('<@') && !message.attachments.length)
        message.content = '';

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

  function handleUserPicture(author: string) {
    switch (author) {
      case 'Hugo Manera':
        return HugoPic.src;
      case 'Koromelo':
        return AfonsoPic.src;
      case 'Edu':
        return LuisPic.src;
      case 'Gertrudes':
        return LuisaPic.src;
      case 'Beatriz':
        return BiaPic.src;
      case 'CãoFantasma':
        return CaoPic.src;
      default:
        return PodrePic.src;
    }
  }

  function handleVerifyAwnser(awnser: string) {
    if (!choosedMessage) return;

    const { username } = choosedMessage.author;

    router.push(
      {
        pathname: '/result',
        query: {
          success: awnser === username,
          username,
        },
      },
      '/result'
    );
  }

  const content =
    (choosedMessage?.formattedAttachments?.length &&
      choosedMessage?.formattedAttachments.map((item) => <>{item}</>)) ||
    choosedMessage?.content;

  return (
    <>
      <Head>
        <title>Guess the Idiot | Game</title>
      </Head>

      {authors && choosedMessage ? (
        <S.ColumnContainer>
          <S.Message>
            {choosedMessage?.formattedMentions?.length &&
              choosedMessage?.formattedMentions.map((item) => <>{item}</>)}

            {content}

            <S.Date>
              {new Date(choosedMessage.timestamp).toLocaleString('pt-BR')}
            </S.Date>
          </S.Message>

          <Row align="middle" justify="center">
            <S.Select
              disabled={!authors?.length}
              getPopupContainer={(trigger) => trigger.parentNode}
              placeholder="Selecione um idiota"
              onChange={(value) => handleVerifyAwnser(String(value))}
            >
              {authors?.map((author) => (
                <Select.Option key={author}>
                  <Row align="middle">
                    <Image
                      preview={false}
                      src={handleUserPicture(author)}
                      alt="profile-pic"
                      height="30px"
                      width="30px"
                    />
                    <S.AuthorName>{author}</S.AuthorName>
                  </Row>
                </Select.Option>
              ))}
            </S.Select>
          </Row>
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
