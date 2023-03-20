import React, { useState, useEffect, useCallback } from 'react';
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
  const [choosedMessage, setChoosedMessage] = useState<I.IMessage>();
  const [timer, setTimer] = useState<string>();
  const [authors, setAuthors] = useState<string[]>();
  const [filterResponse, setFilterResponse] = useState(
    {} as IFilterMessageResponse
  );

  useEffect(() => {
    DiscordMessagesApi.GetDiscordMessages().then(({ authors, message }) => {
      setChoosedMessage(message);
      setFilterResponse(filterMessage(message));
      setAuthors(authors);
    });
  }, []);

  const handleFormatDate = useCallback((timer: string) => {
    const hour = Number(timer.split(':')[0]);
    const minute = Number(timer.split(':')[1]);
    const seconds = Number(timer.split(':')[2]);

    const dataFinal = new Date();
    dataFinal.setHours(dataFinal.getHours() + hour);
    dataFinal.setMinutes(dataFinal.getMinutes() + minute);
    dataFinal.setSeconds(dataFinal.getSeconds() + seconds);

    const x = setInterval(function () {
      const agora = new Date().getTime();
      const tempoRestante = dataFinal.getTime() - agora;
      const hh = Math.floor(
        (tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mm = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
      const ss = Math.floor((tempoRestante % (1000 * 60)) / 1000);

      setTimer(`${hh}h ${mm}m ${ss}s`);

      if (tempoRestante < 0) {
        clearInterval(x);
        console.log('O tempo acabou!');
      }
    }, 1000);
  }, []);

  useEffect(() => {
    DiscordMessagesApi.GetTimer().then((timer) => handleFormatDate(timer));
  }, [handleFormatDate]);

  return (
    <>
      <Head>
        <title>Discordle - Guess the Idiot | Game</title>
      </Head>

      {authors && choosedMessage ? (
        <S.ColumnContainer>
          <ChoosedMessage
            urlLink={filterResponse.urlLink}
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
          spinText="Escolhendo uma linda mensagem ..."
        />
      )}
    </>
  );
}
