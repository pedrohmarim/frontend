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
import { useRouter } from 'next/router';

export default function GameContainer() {
  const router = useRouter();
  const [activeTabKey, setActiveTabKey] = useState<number>(1);
  const [awnsers, setAwnsers] = useState<I.IAwnser[]>([]);
  const [loadGame, setLoadGame] = useState<boolean>(false);
  const [serverName, setServerName] = useState<string>('');
  const [alreadyAwnsered, setAlreadyAwnsered] = useState<boolean>(false);
  const [choosedMessages, setChoosedMessages] = useState<
    IFilterMessageResponse[]
  >([]);

  useEffect(() => {
    const channelId = Cookie.get('channelId');
    const guildId = Cookie.get('guildId');
    const userId = Cookie.get('userId');

    setLoadGame(Boolean(channelId && guildId && userId));

    if (channelId && guildId && userId)
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
    else router.push('/home');
  }, [router]);

  useEffect(() => {
    const channelId = Cookie.get('channelId').toString();
    const guildId = Cookie.get('guildId').toString();
    const userId = Cookie.get('userId').toString();

    if (awnsers.length === 5) {
      const dto: IScoreInstance = {
        channelId,
        guildId,
        scores: {
          userId,
          date: new Date().toLocaleDateString(),
          scoreDetails: awnsers,
        },
      };

      setAlreadyAwnsered(true);

      DiscordMessagesApi.SaveScore(dto);
    }
  }, [awnsers]);

  useEffect(() => {
    const userId = Cookie.get('userId').toString();
    const channelId = Cookie.get('channelId').toString();

    DiscordMessagesApi.VerifyAlreadyAwnsered(userId, channelId).then((data) => {
      if (!data.length) return;

      setAlreadyAwnsered(true);
      setAwnsers(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Discordle - Guess the Idiot | Game</title>
      </Head>

      {loadGame ? (
        <>
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
      ) : (
        <Spin color={theme.colors.text} spinText="Carregando..." />
      )}
    </>
  );
}
