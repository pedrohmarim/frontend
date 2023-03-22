import React, { useState, useEffect, useCallback } from 'react';
import { Spin } from 'antd_components';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordMessages';
import theme from 'globalStyles/theme';
import Head from 'next/head';
import MessageTabs from './components/MessageTabs';
import filterMessage from 'helpers/filter.message';
import formatDate from 'helpers/formatDate';

import { IFilterMessageResponse } from 'helpers/filterMessageEnum';

export default function GameContainer() {
  const [choosedMessages, setChoosedMessages] = useState<
    IFilterMessageResponse[]
  >([]);

  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<string>();
  const [activeTabKey, setActiveTabKey] = useState<number>(1);

  useEffect(() => {
    DiscordMessagesApi.GetDiscordMessages().then((messages) => {
      const filteredMessagesArray: IFilterMessageResponse[] = [];

      messages.forEach(({ message, authors }) => {
        filteredMessagesArray.push(filterMessage(message, authors));

        setChoosedMessages(filteredMessagesArray);
      });
    });
  }, []);

  const handleFormatDate = useCallback((timer: string) => {
    formatDate(timer, setTimer);
  }, []);

  useEffect(() => {
    DiscordMessagesApi.GetTimer().then((timer) => handleFormatDate(timer));
  }, [handleFormatDate]);

  return (
    <>
      <Head>
        <title>Discordle - Guess the Idiot | Game</title>
      </Head>

      {choosedMessages.length === 5 ? (
        <>
          {activeTabKey < 6 ? (
            <S.ColumnContainer>
              <MessageTabs
                score={score}
                setScore={(value) => setScore(value)}
                setActiveTabKey={(value) => setActiveTabKey(value)}
                activeTabKey={String(activeTabKey)}
                choosedMessages={choosedMessages}
              />
            </S.ColumnContainer>
          ) : (
            <>{timer}</>
          )}
        </>
      ) : (
        <Spin
          color={theme.colors.text}
          spinText="Escolhendo lindas mensagens ..."
        />
      )}
    </>
  );
}
