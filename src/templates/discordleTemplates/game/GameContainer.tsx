import React, { useState, useEffect, Fragment } from 'react';
import * as I from './IGame';
import Cookie from 'cookiejs';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import { Notification } from 'antd_components';
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
import { AuthorHighlight } from './components/AuthorSelect/styles';
import theme from 'globalStyles/theme';

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
    ServerName: string;
    ServerIcon: string;
  }>({} as { ServerName: string; ServerIcon: string });

  useEffect(() => {
    if (router.isReady) {
      const userId = Cookie.get('userId');

      const { channelId, guildId } = router.query;

      if (!userId) {
        router.push({
          pathname: '/discordle/chooseProfile',
          query: {
            channelId,
            guildId,
          },
        });
      } else {
        const loadParameters = Boolean(channelId && guildId && userId);

        !loadParameters && router.push('/discordle/chooseProfile');
      }
    }
  }, [router]);

  useEffect(() => {
    function handleReset() {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push('/discordle/chooseProfile');
    }

    if (router.isReady) {
      const { channelId } = router.query;

      if (channelId) {
        DiscordGameApi.GetChoosedMessages(channelId.toString())
          .then(({ Messages, ServerName, ServerIcon, Authors }) => {
            setAuthors(Authors);
            setServerInfos({ ServerName, ServerIcon });

            const filteredMessagesArray: IFilterMessageResponse[] = [];

            Messages.forEach((message) => {
              filteredMessagesArray.push(filterMessage(message));
            });

            setChoosedMessages(filteredMessagesArray);
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
      } else router.push('/discordle/chooseProfile');
    }
  }, [router]);

  function handleReset() {
    Cookie.remove('guildId');
    Cookie.remove('userId');
    Cookie.remove('channelId');
    router.push('/discordle/chooseProfile');
  }

  async function saveScore(
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) {
    const userId = Cookie.get('userId').toString();

    const { channelId, guildId } = router.query;

    if (channelId && guildId) {
      const dto: IScoreInstance = {
        ChannelId: channelId.toString(),
        GuildId: guildId.toString(),
        Score: {
          UserId: userId,
          MessageId: messageId,
          AuthorSelected: authorSelected,
          UsedHint: usedHint,
          ActiveTabKey: activeTabKey,
        },
      };

      if (!alreadyAwnsered) {
        await DiscordGameApi.SaveScore(dto)
          .then((data: I.IAwnser[]) => {
            setAwnsers(data);
            setAlreadyAwnsered(data.length === 5);

            const success = data[data.length - 1].Success;
            const description: JSX.Element = (
              <Fragment>
                {success
                  ? 'Quem mandou essa mensagem foi '
                  : 'A resposta certa era '}
                <AuthorHighlight color={theme.discordleColors.primary}>
                  {data[data.length - 1].Username}
                </AuthorHighlight>
              </Fragment>
            );

            if (success) Notification.success('Acertou!', description);
            else Notification.error('Errou!', description);
          })
          .catch(() => handleReset());
      }
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
            serverName={serverInfos.ServerName}
            serverIcon={serverInfos.ServerIcon}
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
