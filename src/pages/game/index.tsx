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
import filterMessage from 'helpers/filter.message';
import {
  FilterMessageEnum,
  IFilterMessageResponse,
} from 'helpers/filterMessageEnum';

export default function GameContainer() {
  const router = useRouter();
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

  return (
    <>
      <Head>
        <title>Guess the Idiot | Game</title>
      </Head>

      {authors && choosedMessage ? (
        <S.ColumnContainer>
          <S.MessageContainer>
            <S.GameTitle>Guess the Idiot</S.GameTitle>

            {filterResponse.message.content.length > 0 && (
              <>
                <S.Title>Mensagem:</S.Title>

                <S.Message>{filterResponse.message.content}</S.Message>
              </>
            )}

            {filterResponse.formattedAttachs.length > 0 && (
              <>
                <S.Title marginTop="20px">
                  {FilterMessageEnum.isLink === filterResponse.messageType
                    ? 'Link:'
                    : 'Imagem:'}
                </S.Title>

                <S.ImageContainer>
                  {filterResponse.formattedAttachs &&
                    filterResponse.formattedAttachs.map((item) => <>{item}</>)}
                </S.ImageContainer>
              </>
            )}

            <S.Date justify="end">
              {new Date(choosedMessage.timestamp).toLocaleString('pt-BR')}
            </S.Date>
          </S.MessageContainer>

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
