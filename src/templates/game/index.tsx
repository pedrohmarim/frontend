import React, { useState, useEffect } from 'react';
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
