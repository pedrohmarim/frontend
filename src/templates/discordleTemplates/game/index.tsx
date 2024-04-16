import React, { useState, useEffect, Fragment } from 'react';
import * as I from './IGame';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import { FeatherIcons, Notification } from 'antd_components';
import Head from 'next/head';
import filterMessage from 'helpers/discordle/filter.message';
import Result from './components/Result';
import { useRouter } from 'next/router';
import DiscordleInstaceApi from 'services/DiscordleService/DiscordleInstance';
import { AuthorHighlight } from './components/AuthorSelect/styles';
import theme from 'globalStyles/theme';
import { IChoosedMessage } from './components/ChoosedMessage/IChoosedMessage';
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';
import { Container } from 'templates/discordleTemplates/home/components/HomeDiscordleList/styles';
import GuildInfo from '../globalComponents/guildInfo';
import DiscordleGameAPI from 'services/DiscordleService/DiscordleGame';
import MessageSteps from './components/MessageSteps';
import {
  IAuthor,
  IScoreInstance,
} from 'services/DiscordleService/IDiscordleService';

export default function GameContainer() {
  const router = useRouter();
  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(false);
  const [answers, setAnswers] = useState<I.IAnswer[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<number>(1);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openWarnExistsHint, setWarnExistsHint] = useState<boolean>(false);
  const [choosedMessages, setChoosedMessages] = useState<IChoosedMessage[]>([]);
  const [switchValues, setSwitchValues] = useState<I.ISwitchValues | undefined>(
    undefined
  );

  useEffect(() => {
    if (router.isReady) {
      const { channelId, guildId, code } = router.query;

      if (channelId && guildId && code) {
        DiscordleInstaceApi.GetSwitchDiscordleInstance({
          code: code.toString(),
          guildId: guildId.toString(),
          channelId: channelId.toString(),
        }).then((data) => {
          setSwitchValues(data);

          DiscordleGameAPI.VerifyIfIsDiscordleOwner(guildId.toString()).then(
            (isOwner) => setIsOwner(isOwner)
          );

          DiscordGameApi.VerifyAlreadyAnswered(
            channelId.toString(),
            code.toString()
          ).then((data) => {
            const latestAnswer = data[data.length - 1];
            if (latestAnswer) {
              if (latestAnswer.UsedHint) {
                setUsedHint(true);
                setActiveTabKey(data.length);
              } else {
                setActiveTabKey(data.length + 1);
              }
            }

            setAnswers(data);

            const alreadyAnswered =
              data.length === 5 && !latestAnswer?.UsedHint;

            setAlreadyAnswered(alreadyAnswered);

            if (!alreadyAnswered) {
              DiscordGameApi.GetChoosedMessages(
                channelId.toString(),
                code.toString()
              ).then(({ Messages, Authors }) => {
                setAuthors(Authors);

                const filteredMessagesArray: IChoosedMessage[] = Messages.map(
                  (message) => filterMessage(message, MessageLevelEnum.isMain)
                );

                setChoosedMessages(filteredMessagesArray);
              });
            }
          });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function saveScore(
    messageId: string,
    authorSelected: string,
    usedHint: boolean,
    activeTabKey: number
  ) {
    const { channelId, guildId, code } = router.query;

    if (channelId && guildId && code) {
      const dto: IScoreInstance = {
        Code: code.toString(),
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
        const data = await DiscordGameApi.SaveScore(dto);

        if (data.length) {
          setUsedHint(false);
          setAnswers(data);
          setAlreadyAnswered(data.length === 5);

          const score = data.find((x) => x.TabKey === activeTabKey);

          if (score) {
            const { Success, Username } = score;

            const description: JSX.Element = (
              <Fragment>
                {Success
                  ? 'Quem mandou essa mensagem foi '
                  : 'A resposta certa era '}
                <AuthorHighlight color={theme.discordleColors.primary}>
                  {Username}
                </AuthorHighlight>
              </Fragment>
            );

            if (Success) Notification.success('Acertou!', description);
            else Notification.error('Errou!', description);

            if (!Success && activeTabKey === 1 && !usedHint)
              setWarnExistsHint(true);
          }
        }
      }
    }
  }

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void
  ): I.MenuItem {
    return {
      key,
      icon,
      label,
      onClick,
    } as I.MenuItem;
  }

  const moreItems: I.MenuItem[] = [];

  if (isOwner)
    moreItems.push(
      getItem('Configurações', '1', <FeatherIcons icon="settings" />, () =>
        setOpenModal(!openModal)
      )
    );

  return (
    <Container
      margin="25px"
      maxHeight="100%"
      padding="20px"
      alignItems="center"
    >
      <Head>
        <title>Discordle | Game</title>
      </Head>

      <GuildInfo moreItems={moreItems} />

      {switchValues && (
        <Fragment>
          {!alreadyAnswered ? (
            <MessageSteps
              openWarnExistsHint={openWarnExistsHint}
              choosedMessages={choosedMessages}
              switchValues={switchValues}
              activeTabKey={activeTabKey}
              openModal={openModal}
              usedHint={usedHint}
              answers={answers}
              authors={authors}
              saveScore={saveScore}
              setUsedHint={setUsedHint}
              setOpenModal={setOpenModal}
              setSwitchValues={setSwitchValues}
              setActiveTabKey={setActiveTabKey}
              setWarnExistsHint={setWarnExistsHint}
            />
          ) : (
            <Result
              switchValues={switchValues}
              answers={answers}
              totalScore={switchValues.PointsPerCorrectAnswer}
            />
          )}
        </Fragment>
      )}
    </Container>
  );
}
