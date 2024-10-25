import React, { useState, useEffect, Fragment } from 'react';
import * as I from './IGame';
import * as S from './styles';
import DiscordGameApi from 'services/DiscordleService/DiscordleGame';
import { Notification } from 'antd_components';
import Head from 'next/head';
import filterMessage from 'helpers/discordle/filter.message';
import Result from './components/Result';
import { useRouter } from 'next/router';
import { AuthorHighlight } from './components/AuthorSelect/styles';
import theme from 'globalStyles/theme';
import { IChoosedMessage } from './components/ChoosedMessage/IChoosedMessage';
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';
import { Container } from 'templates/discordleTemplates/home/components/HomeDiscordleList/styles';
import GuildInfo from '../globalComponents/guildInfo';
import MessageSteps from './components/MessageSteps';
import { useMyContext } from 'Context';
import ConfigurationModal from './components/ConfigurationModal';
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';
import { MessageContainer } from 'globalStyles/global';
import { LoadingOutlined } from '@ant-design/icons';
import {
  IAuthor,
  IScoreInstance,
} from 'services/DiscordleService/IDiscordleService';

export default function GameContainer() {
  const { i18n, t } = useTranslation('Game');
  const { switchValues } = useMyContext();
  const router = useRouter();
  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(false);
  const [answers, setAnswers] = useState<I.IAnswer[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<number>(1);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [notCreatedYet, setNotCreatedYet] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [openWarnExistsHint, setWarnExistsHint] = useState<boolean>(false);
  const [choosedMessages, setChoosedMessages] = useState<IChoosedMessage[]>([]);

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

  useEffect(() => {
    if (router.isReady) {
      const { channelId, guildId, code } = router.query;

      if (channelId && guildId && code) {
        DiscordGameApi.VerifyAlreadyAnswered(
          channelId.toString(),
          code.toString()
        )
          .then((data) => {
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
              ).then(({ Messages, Authors, NotCreatedYet }) => {
                setNotCreatedYet(NotCreatedYet);
                setAuthors(Authors);

                const filteredMessagesArray: IChoosedMessage[] = Messages.map(
                  (message) => filterMessage(message, MessageLevelEnum.isMain)
                );

                setChoosedMessages(filteredMessagesArray);
              });
            }
          })
          .then(() => setLoading(false));
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
                  ? t('correctAwnserNotificationDescription')
                  : t('wrongAwnserNotificationDescription')}
                <AuthorHighlight color={theme.discordleColors.primary}>
                  {Username}
                </AuthorHighlight>
              </Fragment>
            );

            if (Success)
              Notification.success(
                t('correctAwnserNotificationTitle'),
                description
              );
            else
              Notification.error(
                t('wrongAwnserNotificationTitle'),
                description
              );

            if (!Success && activeTabKey === 1 && !usedHint)
              setWarnExistsHint(true);
          }
        }
      }
    }
  }

  return (
    <Container
      margin="25px"
      maxHeight="100%"
      padding="20px"
      alignItems="center"
    >
      <Head>
        <title>Discordle | {t('tabTitle')}</title>
      </Head>

      <ConfigurationModal openModal={openModal} setOpenModal={setOpenModal} />

      <GuildInfo openModal={openModal} setOpenModal={setOpenModal} />

      {notCreatedYet ? (
        <MessageContainer width="100%" height="300px" margin="10px 0 0 0">
          <S.Container>
            <LoadingOutlined
              style={{
                marginRight: '15px',
              }}
            />
            {t('creatingInstance')}
          </S.Container>
        </MessageContainer>
      ) : (
        <Fragment>
          {!alreadyAnswered ? (
            <MessageSteps
              openWarnExistsHint={openWarnExistsHint}
              choosedMessages={choosedMessages}
              switchValues={switchValues}
              activeTabKey={activeTabKey}
              usedHint={usedHint}
              loading={loading}
              answers={answers}
              authors={authors}
              saveScore={saveScore}
              setUsedHint={setUsedHint}
              setActiveTabKey={setActiveTabKey}
              setWarnExistsHint={setWarnExistsHint}
            />
          ) : (
            <Result
              switchValues={switchValues}
              answers={answers}
              totalScore={switchValues?.PointsPerCorrectAnswer}
            />
          )}
        </Fragment>
      )}
    </Container>
  );
}
