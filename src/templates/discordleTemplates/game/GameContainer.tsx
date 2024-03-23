import React, { useState, useEffect, Fragment } from 'react';
import * as I from './IGame';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import { Notification } from 'antd_components';
import Head from 'next/head';
import MessageTabs from './components/MessageTabs';
import filterMessage from 'helpers/discordle/filter.message';
import Result from './components/Result';
import { useRouter } from 'next/router';
import { MessageContainer } from 'globalStyles/global';
import { AuthorHighlight } from './components/AuthorSelect/styles';
import theme from 'globalStyles/theme';
import {
  IAuthor,
  IScoreInstance,
} from 'services/DiscordleService/IDiscordleService';
import { IChoosedMessage } from './components/ChoosedMessage/IChoosedMessage';
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';

export default function GameContainer() {
  const router = useRouter();
  const [activeTabKey, setActiveTabKey] = useState<number>(1);
  const [awnsers, setAwnsers] = useState<I.IAwnser[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [alreadyAwnsered, setAlreadyAwnsered] = useState<boolean>(false);
  const [useHint, setUsedHint] = useState<boolean>(false);
  const [choosedMessages, setChoosedMessages] = useState<IChoosedMessage[]>([]);
  const [serverInfos, setServerInfos] = useState<{
    ServerName: string;
    ServerIcon: string;
  }>({} as { ServerName: string; ServerIcon: string });

  useEffect(() => {
    if (router.isReady) {
      const { channelId, guildId } = router.query;

      if (channelId && guildId) {
        DiscordGameApi.VerifyAlreadyAwnsered(channelId.toString()).then(
          (data) => {
            if (data.length > 0 && data[data.length - 1].UsedHint) {
              setActiveTabKey(data.length);
              setUsedHint(true);
            } else setActiveTabKey(data.length + 1 > 5 ? 5 : data.length + 1);

            setAwnsers(data);

            const alreadyAwnsered =
              data.length === 5 && !data[data.length - 1].UsedHint;

            setAlreadyAwnsered(alreadyAwnsered);

            if (!alreadyAwnsered) {
              DiscordGameApi.GetChoosedMessages(channelId.toString()).then(
                ({ Messages, ServerName, ServerIcon, Authors }) => {
                  setAuthors(Authors);
                  setServerInfos({ ServerName, ServerIcon });

                  const filteredMessagesArray: IChoosedMessage[] = [];

                  Messages.forEach((message) => {
                    filteredMessagesArray.push(
                      filterMessage(message, MessageLevelEnum.isMain)
                    );
                  });

                  setChoosedMessages(filteredMessagesArray);
                }
              );
            }
          }
        );
      }
    }
  }, [router]);

  async function saveScore(
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) {
    const { channelId, guildId } = router.query;

    if (channelId && guildId) {
      const dto: IScoreInstance = {
        ChannelId: channelId.toString(),
        GuildId: guildId.toString(),
        Score: {
          MessageId: messageId,
          AuthorSelected: authorSelected,
          UsedHint: usedHint,
          ActiveTabKey: activeTabKey,
        },
      };

      if (!alreadyAwnsered) {
        await DiscordGameApi.SaveScore(dto).then((data: I.IAwnser[]) => {
          setUsedHint(false);
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
        });
      }
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Discordle | Game</title>
      </Head>

      <MessageContainer>
        {!alreadyAwnsered ? (
          <MessageTabs
            usedHint={useHint}
            serverName={serverInfos.ServerName}
            serverIcon={serverInfos.ServerIcon}
            activeTabKey={activeTabKey}
            awnsers={awnsers}
            authors={authors}
            choosedMessages={choosedMessages}
            saveScore={saveScore}
            setUsedHint={setUsedHint}
            setActiveTabKey={setActiveTabKey}
          />
        ) : (
          <Result awnsers={awnsers} />
        )}
      </MessageContainer>
    </Fragment>
  );
}
