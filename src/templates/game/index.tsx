import React, { useState, useEffect, useCallback } from 'react';
import { Spin } from 'antd_components';
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
  const [choosedMessages, setChoosedMessages] = useState<
    IFilterMessageResponse[]
  >([]);

  const [timer, setTimer] = useState<string>();
  const [activeTabKey, setActiveTabKey] = useState<string>('1');

  const handleTabChange = (key: string) => setActiveTabKey(key);

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

        DiscordMessagesApi.GetTimer().then((timer) => handleFormatDate(timer));
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

      {choosedMessages.length === 5 ? (
        <>
          {Number(activeTabKey) !== 5 ? (
            <S.ColumnContainer>
              <S.Tabs activeKey={activeTabKey} onChange={handleTabChange}>
                {choosedMessages.map(
                  (
                    {
                      authors,
                      message,
                      formattedAttachs,
                      messageType,
                      urlLink,
                    },
                    index
                  ) => {
                    const { timestamp, content, id, author } = message;
                    const current = index + 1;

                    return (
                      <S.TabsPane
                        disabled={String(current) !== activeTabKey}
                        key={String(current)}
                        tab={`Pergunta ${current}`}
                      >
                        <ChoosedMessage
                          key={index}
                          content={content}
                          timestamp={timestamp}
                          id={id}
                          messageLevel={MessageLevelEnum.isMain}
                          urlLink={urlLink}
                          formattedAttachs={formattedAttachs}
                          messageType={messageType}
                          authorsOptions={authors}
                        />

                        <AuthorSelect
                          authorMessage={author.username}
                          authorsOptions={authors}
                        />
                      </S.TabsPane>
                    );
                  }
                )}
              </S.Tabs>
            </S.ColumnContainer>
          ) : (
            <>acabou :)</>
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
