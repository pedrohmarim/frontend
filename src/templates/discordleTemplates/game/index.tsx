import React, { useState, useEffect, Fragment } from 'react';
import * as I from './IGame';
import * as S from './styles';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import { Notification } from 'antd_components';
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
import ChoosedMessage from 'templates/discordleTemplates/game/components/ChoosedMessage';
import AuthorSelect from 'templates/discordleTemplates/game/components/AuthorSelect';
import DiscordleGameAPI from 'services/DiscordleService/DiscordleGame';
import ConfigurationModal from './components/ConfigurationModal';
import { FeatherIcons } from 'antd_components';
import { MessageContainer } from 'globalStyles/global';
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
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [authorSelected, setAuthorSelected] = useState<string>('');
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
        }).then((data) => setSwitchValues(data));

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

          const alreadyAnswered = data.length === 5 && !latestAnswer?.UsedHint;

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

  useEffect(() => {
    if (router.isReady) {
      const { guildId } = router.query;

      if (guildId)
        DiscordleGameAPI.VerifyIfIsDiscordleOwner(guildId.toString()).then(
          (isOwner) => setIsOwner(isOwner)
        );
    }
  }, [router]);

  function handleIcon(index: number, current: number, color: string) {
    let icon = '';

    if (!answers[index]?.Success || answers[index]?.UsedHint)
      icon = 'help-circle';

    if (
      answers[index]?.TabKey === current &&
      answers[index]?.Success &&
      !answers[index]?.UsedHint
    ) {
      icon = 'check-circle';
      color = answers[index]?.Score % 2 === 0 ? '#009e3f' : '#d48a00';
    }

    if (
      answers[index]?.TabKey === current &&
      !answers[index]?.Success &&
      !answers[index]?.UsedHint
    ) {
      icon = 'x-circle';
      color = '#a61f1f';
    }

    return <FeatherIcons icon={icon} color={color} />;
  }

  const score = answers.reduce((accumulator, curValue) => {
    return accumulator + curValue.Score;
  }, 0);

  const steps = choosedMessages.map((choosedMessage, index) => {
    return {
      title: <S.MessageTabTitle>{`Mensagem ${index + 1}`}</S.MessageTabTitle>,
      icon: handleIcon(
        index,
        index + 1,
        index + 1 === activeTabKey ? theme.discordleColors.primary : '#fff'
      ),
      content: (
        <Fragment>
          <ChoosedMessage
            authorSelected={authorSelected}
            openModal={openModal}
            isOwner={isOwner}
            score={score}
            usedHint={usedHint}
            tabkey={activeTabKey}
            message={choosedMessage}
            switchValues={switchValues}
            openWarnExistsHint={openWarnExistsHint}
            setUsedHint={setUsedHint}
            setWarnExistsHint={setWarnExistsHint}
            setOpenModal={setOpenModal}
          />

          <AuthorSelect
            messageId={choosedMessage.id}
            activeTabKey={activeTabKey}
            usedHint={usedHint}
            authors={authors}
            saveScore={saveScore}
            setUsedHint={setUsedHint}
            setActiveTabKey={setActiveTabKey}
            setAuthorSelected={setAuthorSelected}
          />
        </Fragment>
      ),
    };
  });

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

      <GuildInfo />

      {switchValues && (
        <Fragment>
          {!alreadyAnswered ? (
            <Fragment>
              <ConfigurationModal
                openModal={openModal}
                switchValues={switchValues}
                setOpenModal={setOpenModal}
                setSwitchValues={setSwitchValues}
              />

              {steps.length === 5 && (
                <Fragment>
                  <S.Steps current={activeTabKey - 1} items={steps} />

                  <MessageContainer width="100%" margin="10px 0 0 0">
                    {steps[activeTabKey - 1].content}
                  </MessageContainer>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Result
              answers={answers}
              totalScore={switchValues.PointsPerCorrectAnswer}
            />
          )}
        </Fragment>
      )}
    </Container>
  );
}
