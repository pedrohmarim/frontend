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
import DiscordleInstaceApi from 'services/DiscordleService/DiscordleInstance';
import { AuthorHighlight } from './components/AuthorSelect/styles';
import theme from 'globalStyles/theme';
import { IChoosedMessage } from './components/ChoosedMessage/IChoosedMessage';
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';
import {
  IAuthor,
  IScoreInstance,
} from 'services/DiscordleService/IDiscordleService';

export default function GameContainer() {
  const router = useRouter();
  const [activeTabKey, setActiveTabKey] = useState<number>(1);
  const [answers, setAnswers] = useState<I.IAnswer[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(false);
  const [useHint, setUsedHint] = useState<boolean>(false);
  const [switchValues, setSwitchValues] = useState<I.ISwitchValues | undefined>(
    undefined
  );
  const [choosedMessages, setChoosedMessages] = useState<IChoosedMessage[]>([]);
  const [serverInfos, setServerInfos] = useState<{
    ServerName: string;
    ServerIcon: string;
  }>({} as { ServerName: string; ServerIcon: string });

  useEffect(() => {
    if (router.isReady) {
      const { channelId, guildId } = router.query;

      if (channelId && guildId) {
        DiscordleInstaceApi.GetSwitchDiscordleInstance({
          channelId: channelId.toString(),
          guildId: guildId.toString(),
        }).then((data) => setSwitchValues(data));

        DiscordGameApi.VerifyAlreadyAnswered(channelId.toString()).then(
          (data) => {
            if (data.length > 0 && data[data.length - 1].UsedHint) {
              setActiveTabKey(data.length);
              setUsedHint(true);
            } else setActiveTabKey(data.length + 1);

            setAnswers(data);

            const alreadyAnswered =
              data.length === 5 && !data[data.length - 1].UsedHint;

            setAlreadyAnswered(alreadyAnswered);

            if (!alreadyAnswered) {
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

      if (!alreadyAnswered) {
        await DiscordGameApi.SaveScore(dto).then((data: I.IAnswer[]) => {
          setUsedHint(false);
          setAnswers(data);
          setAlreadyAnswered(data.length === 5);

          const success = data[data.length - 1].Success;
          const description: JSX.Element = (
            <Fragment>
              {success
                ? 'Quem mandou essa mensagem foi '
                : 'A resposta certa era '}
              <AuthorHighlight color={theme.discordleColors.primary}>
                {data.find((x) => x.TabKey === activeTabKey)?.Username}
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

      {switchValues && (
        <Fragment>
          <MessageContainer>
            {!alreadyAnswered ? (
              <MessageTabs
                setSwitchValues={setSwitchValues}
                setActiveTabKey={setActiveTabKey}
                setUsedHint={setUsedHint}
                saveScore={saveScore}
                answers={answers}
                authors={authors}
                usedHint={useHint}
                activeTabKey={activeTabKey}
                switchValues={switchValues}
                choosedMessages={choosedMessages}
                serverName={serverInfos.ServerName}
                serverIcon={serverInfos.ServerIcon}
              />
            ) : (
              <Result
                answers={answers}
                totalScore={switchValues.PointsPerCorrectAnswer}
              />
            )}
          </MessageContainer>
        </Fragment>
      )}
    </Fragment>
  );
}
