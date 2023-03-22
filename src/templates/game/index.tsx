import React, { useState, useEffect, useCallback } from 'react';
import { Spin } from 'antd_components';
import * as S from './styles';
import * as I from './IGame';
import DiscordMessagesApi from 'services/DiscordMessages';
import theme from 'globalStyles/theme';
import Head from 'next/head';
import MessageTabs from './components/MessageTabs';
import filterMessage from 'helpers/filter.message';
import formatDate from 'helpers/formatDate';
import Result from './components/Result';
import { IFilterMessageResponse } from 'helpers/filterMessageEnum';
import { IPostSaveScore } from 'services/DiscordMessages/IDiscordMessagesService';

export default function GameContainer() {
  const [activeTabKey, setActiveTabKey] = useState<number>(1);
  const [awnsers, setAwnsers] = useState<I.IAwnser[]>([]);
  const [choosedMessages, setChoosedMessages] = useState<
    IFilterMessageResponse[]
  >([]);

  const [timer, setTimer] = useState<string>();

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

  useEffect(() => {
    if (awnsers.length === 5) {
      const dto: IPostSaveScore = {
        awnsers,
        date: new Date().toLocaleDateString(),
        userId: '123', //isso vai mudar,
      };

      DiscordMessagesApi.SaveScore(dto);
    }
  }, [awnsers]);

  return (
    <>
      <Head>
        <title>Discordle - Guess the Idiot | Game</title>
      </Head>

      {choosedMessages.length === 5 ? (
        <>
          {awnsers.length < 5 ? (
            <S.ColumnContainer>
              <MessageTabs
                activeTabKey={activeTabKey}
                awnsers={awnsers}
                setAwnsers={setAwnsers}
                choosedMessages={choosedMessages}
                setActiveTabKey={setActiveTabKey}
              />
            </S.ColumnContainer>
          ) : (
            <Result awnsers={awnsers} timer={timer} />
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
