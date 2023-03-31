import React, { useState, useEffect } from 'react';
import { Spin, Row } from 'antd_components';
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
  const [alreadyAwnsered, setAlreadyAwnsered] = useState<boolean>(false);
  const [choosedMessages, setChoosedMessages] = useState<
    IFilterMessageResponse[]
  >([]);
  const [serverInfos, setServerInfos] = useState<{
    serverName: string;
    serverIcon: string;
  }>({} as { serverName: string; serverIcon: string });

  useEffect(() => {
    if (router.isReady) {
      const userId = Cookie.get('userId');

      const { channelId, guildId } = router.query;

      if (!userId) {
        router.push({
          pathname: '/chooseProfile',
          query: {
            channelId,
            guildId,
          },
        });
      } else {
        const loadParameters = Boolean(channelId && guildId && userId);

        loadParameters ? setLoadGame(loadParameters) : router.push('/');
      }
    }
  }, [router]);

  useEffect(() => {
    function handleReset() {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push('/');
    }

    if (router.isReady) {
      const { channelId } = router.query;

      if (channelId) {
        DiscordMessagesApi.GetChoosedMessages(channelId.toString())
          .then(({ messages, serverName, serverIcon }) => {
            setServerInfos({ serverName, serverIcon });

            const filteredMessagesArray: IFilterMessageResponse[] = [];

            messages.forEach(({ message, authors }) => {
              filteredMessagesArray.push(filterMessage(message, authors));

              setChoosedMessages(filteredMessagesArray);
            });
          })
          .catch(() => handleReset());

        const userId = Cookie.get('userId').toString();

        DiscordMessagesApi.VerifyAlreadyAwnsered(userId, channelId.toString())
          .then((data) => {
            if (!data.length) return;

            setAlreadyAwnsered(true);
            setAwnsers(data);
          })
          .catch(() => handleReset());
      } else router.push('/');
    }
  }, [router]);

  useEffect(() => {
    function handleReset() {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push('/');
    }

    if (router.isReady) {
      const userId = Cookie.get('userId').toString();

      const { channelId, guildId } = router.query;

      if (awnsers.length === 5 && channelId && guildId) {
        const dto: IScoreInstance = {
          channelId: channelId.toString(),
          guildId: guildId.toString(),
          scores: {
            userId,
            date: new Date().toLocaleDateString(),
            scoreDetails: awnsers,
          },
        };

        if (!alreadyAwnsered)
          DiscordMessagesApi.SaveScore(dto)
            .then(() => setAlreadyAwnsered(true))
            .catch(() => handleReset());
      }
    }
  }, [alreadyAwnsered, awnsers, router]);

  return (
    <>
      <Head>
        <title>Discordle | Game</title>
      </Head>

      {loadGame ? (
        <>
          {choosedMessages.length !== 5 ? (
            <Spin color={theme.colors.text} />
          ) : (
            <>
              {awnsers.length < 5 && !alreadyAwnsered ? (
                <MessageTabs
                  serverName={serverInfos.serverName}
                  serverIcon={serverInfos.serverIcon}
                  activeTabKey={activeTabKey}
                  awnsers={awnsers}
                  setAwnsers={setAwnsers}
                  choosedMessages={choosedMessages}
                  setActiveTabKey={setActiveTabKey}
                />
              ) : (
                <Result awnsers={awnsers} />
              )}
            </>
          )}
        </>
      ) : (
        <Row justify="center">
          <Spin color={theme.colors.text} />
        </Row>
      )}
    </>
  );
}
