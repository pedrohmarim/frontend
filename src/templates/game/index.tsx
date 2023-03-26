import React, { useState, useEffect } from 'react';
import { Spin } from 'antd_components';
import * as S from './styles';
import * as I from './IGame';
import Cookie from 'cookiejs';
import DiscordMessagesApi from 'services/DiscordMessages';
import theme from 'globalStyles/theme';
import Head from 'next/head';
import MessageTabs from './components/MessageTabs';
import filterMessage from 'helpers/filter.message';
import Result from './components/Result';
import { IFilterMessageResponse } from 'helpers/filterMessageEnum';
import { IScoreInstance } from 'services/DiscordMessages/IDiscordMessagesService';
import router from 'next/router';

export default function GameContainer() {
  const [activeTabKey, setActiveTabKey] = useState<number>(1);
  const [awnsers, setAwnsers] = useState<I.IAwnser[]>([]);
  const [channelId, setChannelId] = useState<boolean>();
  const [serverName, setServerName] = useState<string>('');
  const [alreadyAwnsered, setAlreadyAwnsered] = useState<boolean>(false);
  const [choosedMessages, setChoosedMessages] = useState<
    IFilterMessageResponse[]
  >([]);

  useEffect(() => {
    const channelId = Cookie.get('channelId');
    setChannelId(Boolean(channelId));

    if (!channelId) router.push('/home');
    else {
      DiscordMessagesApi.GetChoosedMessages(channelId.toString()).then(
        ({ messages, serverName }) => {
          setServerName(serverName);

          const filteredMessagesArray: IFilterMessageResponse[] = [];

          messages.forEach(({ message, authors }) => {
            filteredMessagesArray.push(filterMessage(message, authors));

            setChoosedMessages(filteredMessagesArray);
          });
        }
      );
    }
  }, []);

  const userId = '123';

  useEffect(() => {
    const channelId = Cookie.get('channelId').toString();

    if (awnsers.length === 5) {
      const dto: IScoreInstance = {
        channelId,
        userId,
        scores: {
          date: new Date().toLocaleDateString(),
          scoreDetails: awnsers,
        },
      };

      setAlreadyAwnsered(true);

      DiscordMessagesApi.SaveScore(dto);
    }
  }, [awnsers]);

  useEffect(() => {
    DiscordMessagesApi.VerifyAlreadyAwnsered(userId).then((res) => {
      if (res.length === 1) {
        setAlreadyAwnsered(true);
        const { scoreDetails } = res[0];
        setAwnsers(scoreDetails);
      }
    });
  }, []);

  if (!channelId) return <></>;

  return (
    <>
      <Head>
        <title>Discordle - Guess the Idiot | Game</title>
      </Head>

      {choosedMessages.length !== 5 ? (
        <Spin color={theme.colors.text} spinText="Carregando..." />
      ) : (
        <>
          {awnsers.length < 5 && !alreadyAwnsered ? (
            <S.ColumnContainer>
              <MessageTabs
                serverName={serverName}
                activeTabKey={activeTabKey}
                awnsers={awnsers}
                setAwnsers={setAwnsers}
                choosedMessages={choosedMessages}
                setActiveTabKey={setActiveTabKey}
              />
            </S.ColumnContainer>
          ) : (
            <Result awnsers={awnsers} />
          )}
        </>
      )}
    </>
  );
}
