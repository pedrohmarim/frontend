import React, { useState, useEffect, Fragment } from 'react';
import * as I from './IGame';
import Cookie from 'cookiejs';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import Head from 'next/head';
import MessageTabs from './components/MessageTabs';
import filterMessage from 'helpers/discordle/filter.message';
import Result from './components/Result';
import { IFilterMessageResponse } from 'helpers/discordle/filterMessageEnum';
import { useRouter } from 'next/router';
import { MessageContainer } from 'globalStyles/global';
import {
  IAuthor,
  IScoreInstance,
} from 'services/DiscordleService/IDiscordleService';

export default function GameContainer() {
  const router = useRouter();
  const [activeTabKey, setActiveTabKey] = useState<number>(1);
  const [awnsers, setAwnsers] = useState<I.IAwnser[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
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
          pathname: '/discordle/home',
          query: {
            channelId,
            guildId,
          },
        });
      } else {
        const loadParameters = Boolean(channelId && guildId && userId);

        !loadParameters && router.push('/discordle/home');
      }
    }
  }, [router]);

  useEffect(() => {
    function handleReset() {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push('/discordle/home');
    }

    if (router.isReady) {
      const { channelId } = router.query;

      if (channelId) {
        DiscordGameApi.GetChoosedMessages(channelId.toString())
          .then(({ messages, serverName, serverIcon, authors }) => {
            setAuthors(authors);
            setServerInfos({ serverName, serverIcon });

            const filteredMessagesArray: IFilterMessageResponse[] = [];

            messages.forEach((message) => {
              filteredMessagesArray.push(filterMessage(message));

              setChoosedMessages(filteredMessagesArray);
            });
          })
          .catch(() => handleReset());

        const userId = Cookie.get('userId').toString();

        DiscordGameApi.VerifyAlreadyAwnsered(userId, channelId.toString())
          .then((data) => {
            setActiveTabKey(data.length + 1);

            if (!data.length) return;

            if (data.length === 5) setAlreadyAwnsered(true);

            setAwnsers(data);
          })
          .catch(() => handleReset());
      } else router.push('/discordle/home');
    }
  }, [router]);

  function handleReset() {
    Cookie.remove('guildId');
    Cookie.remove('userId');
    Cookie.remove('channelId');
    router.push('/discordle/home');
  }

  function saveScore(awnser: I.IAwnser) {
    const userId = Cookie.get('userId').toString();

    const { channelId, guildId } = router.query;

    if (channelId && guildId) {
      const dto: IScoreInstance = {
        channelId: channelId.toString(),
        guildId: guildId.toString(),
        scores: {
          userId,
          date: new Date().toLocaleDateString(),
          scoreDetails: awnser,
        },
      };

      if (!alreadyAwnsered)
        DiscordGameApi.SaveScore(dto)
          .then((alreadyAwnsered) => setAlreadyAwnsered(alreadyAwnsered))
          .catch(() => handleReset());
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Discordle | Game</title>
      </Head>

      <MessageContainer>
        {awnsers.length < 5 && !alreadyAwnsered ? (
          <MessageTabs
            serverName={serverInfos.serverName}
            serverIcon={serverInfos.serverIcon}
            activeTabKey={activeTabKey}
            awnsers={awnsers}
            saveScore={saveScore}
            setAwnsers={setAwnsers}
            authors={authors}
            choosedMessages={choosedMessages}
            setActiveTabKey={setActiveTabKey}
          />
        ) : (
          <Result awnsers={awnsers} />
        )}
      </MessageContainer>
    </Fragment>
  );
}
