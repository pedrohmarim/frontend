import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Row, Select, Form, Image } from 'antd_components';
import DiscordMessagesApi from 'services/DiscordMessages';
import * as S from 'styles/home.styles';
import * as I from 'services/DiscordMessages/IDiscordMessagesService';
import HugoPic from 'assets/hugo.jpg';
import AfonsoPic from 'assets/afonso.png';
import LuisPic from 'assets/luis.jpg';
import PodrePic from 'assets/podre.png';
import LuisaPic from 'assets/luisa.png';
import BiaPic from 'assets/bia.png';
import CaoPic from 'assets/cao.png';

export default function Home() {
  const [messages, setMessages] = useState<I.IMessage[]>();
  const [choosedMessage, setChoosedMessage] = useState({} as I.IMessage);
  const [authors, setAuthors] = useState<string[]>();
  const [form] = Form.useForm();

  useEffect(() => {
    DiscordMessagesApi.GetDiscordMessages().then((data) => {
      setMessages(data);

      const unique_authors = handleDistinctAuthorArray(data);

      setAuthors(unique_authors);
    });
  }, []);

  const range = (start: number, end: number) => {
    const result = Math.floor(Math.random() * (end - start + 1)) + start;
    console.log(start, end, 'saiu:', result);

    return result;
  };

  const GetDiscordPreviousMessages = useCallback(
    (id: string) => {
      if (!messages?.length) return;

      return DiscordMessagesApi.GetDiscordPreviousMessages(id).then(
        (data) => data
      );
    },
    [messages]
  );

  const iteration = useCallback(
    async (messages: I.IMessage[]) => {
      let array: I.IMessage[] | undefined = [];

      for (let index = 1; index < range(1, 15); index++) {
        array = await GetDiscordPreviousMessages(
          messages[messages.length - 1].id
        );
      }

      return array;
    },
    [GetDiscordPreviousMessages]
  );

  const handleChoseMessage = useCallback(
    async (messages: I.IMessage[]) => {
      let array = await iteration(messages);

      if (array?.length)
        setChoosedMessage(array[range(0, messages?.length - 1)]);
      else {
        array = await iteration(messages);

        if (array?.length)
          setChoosedMessage(array[range(0, messages?.length - 1)]);
      }
    },
    [iteration]
  );

  useEffect(() => {
    if (!messages?.length) return;

    const randomMessage = handleChoseMessage(messages);
    console.log(randomMessage);
  }, [handleChoseMessage, messages]);

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

  const GuessContainer = () => (
    <Form form={form} onFinish={() => console.log('')} layout="vertical">
      <Row justify="center">
        <S.Message>{choosedMessage.content || 'Carregando...'}</S.Message>
      </Row>

      <Row align="middle" justify="center">
        <Select
          showSearch
          style={{ width: '300px' }}
          disabled={!authors?.length}
          getPopupContainer={(trigger) => trigger.parentNode}
          placeholder="Selecione um idiota"
          onChange={(value) => alert(value)}
        >
          {authors?.map((author) => (
            <Select.Option key={author}>
              <Row align="middle">
                <Image
                  preview={false}
                  src={handleUserPicture(author)}
                  alt="profile-pic"
                  height="40px"
                  width="40px"
                />
                <S.AuthorName>{author}</S.AuthorName>
              </Row>
            </Select.Option>
          ))}
        </Select>
      </Row>
    </Form>
  );

  return (
    <>
      <Head>
        <title>Guess the Idiot | Home</title>
      </Head>

      {authors && <GuessContainer />}
    </>
  );
}
