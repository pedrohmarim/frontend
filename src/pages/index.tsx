import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import {
  Row,
  Select,
  Form,
  Image,
  Spin,
  Result,
  Button,
} from 'antd_components';
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
import theme from 'globalStyles/theme';

export default function Home() {
  const [messages, setMessages] = useState<I.IMessage[]>();
  const [choosedMessage, setChoosedMessage] = useState<I.IMessage>();
  const [authors, setAuthors] = useState<string[]>();
  const [success, setSuccess] = useState<boolean>();
  const [form] = Form.useForm();

  const range = (start: number, end: number) => {
    const result = Math.floor(Math.random() * (end - start + 1)) + start;

    return result;
  };

  const times = range(1, 8);

  const handleGetPreviousMessageArray = useCallback(
    async (message: I.IMessage) => {
      return await DiscordMessagesApi.GetDiscordPreviousMessages(message.id);
    },
    []
  );

  async function getLastElementRecursive(
    arr: I.IMessage[],
    rangeNumber: number
  ): Promise<I.IMessage> {
    const message = arr[range(0, arr.length - 1)];

    if (
      rangeNumber === 0 &&
      message.content.length > 20 &&
      !message.content.includes('<@') &&
      !message.content.includes('<:') &&
      !message.content.includes('https://') &&
      !message.content.split('').every((char) => char === message.content[0]) &&
      !message.content.includes('||')
    ) {
      const unique_authors = handleDistinctAuthorArray(arr);
      setAuthors(unique_authors);

      return message;
    } else {
      const lastElement = arr[arr.length - 1];
      const newArray = await handleGetPreviousMessageArray(lastElement);

      return getLastElementRecursive(
        newArray.slice(1),
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

  function handleChooseOtherMessage() {
    setSuccess(undefined);
    setAuthors(undefined);
    setChoosedMessage(undefined);

    getLastElementRecursiveCallBack();
  }

  const ResultContainer = () => {
    const title = success ? 'Acertou!' : 'Errou!';
    const subTitle = success
      ? 'Parabéns você realmente conhece seus colegas.'
      : 'Você não é um bom colega...';

    const status = success ? 'success' : 'error';

    return (
      <Result
        title={<S.Span>{title}</S.Span>}
        subTitle={<S.Span>{subTitle}</S.Span>}
        status={status}
        extra={
          <Row justify="center">
            <Button type="primary" onClick={handleChooseOtherMessage}>
              Jogar novamente
            </Button>
          </Row>
        }
      />
    );
  };
  const GuessContainer = () =>
    authors && choosedMessage ? (
      <Form form={form} onFinish={() => console.log('')} layout="vertical">
        <Row justify="center">
          <S.Message>{choosedMessage.content}</S.Message>
        </Row>

        <Row align="middle" justify="center">
          <S.Select
            disabled={!authors?.length}
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder="Selecione um idiota"
            onChange={(value) =>
              setSuccess(value == choosedMessage?.author.username)
            }
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
      </Form>
    ) : (
      <Spin color={theme.colors.text} tip="Carregando uma linda mensagem ..." />
    );

  return (
    <S.Container>
      <Head>
        <title>Guess the Idiot | Home</title>
      </Head>

      {success == undefined ? <GuessContainer /> : <ResultContainer />}
    </S.Container>
  );
}
