import React, { Fragment, useEffect, useState } from 'react';
import { FeatherIcons, Skeleton } from 'antd_components';
import * as S from './styles';
import * as I from './IMessageSteps';
import theme from 'globalStyles/theme';
import ChoosedMessage from 'templates/discordleTemplates/game/components/ChoosedMessage';
import AuthorSelect from 'templates/discordleTemplates/game/components/AuthorSelect';
import { MessageContainer } from 'globalStyles/global';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';

export default function MessageSteps({
  openWarnExistsHint,
  choosedMessages,
  switchValues,
  activeTabKey,
  usedHint,
  loading,
  answers,
  authors,
  saveScore,
  setUsedHint,
  setActiveTabKey,
  setWarnExistsHint,
}: I.IMessageSteps) {
  const { i18n, t } = useTranslation('Game');
  const [authorSelected, setAuthorSelected] = useState<string>('');

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

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
      title: (
        <S.MessageTabTitle>{`${t('message')} ${index + 1}`}</S.MessageTabTitle>
      ),
      icon: handleIcon(
        index,
        index + 1,
        index + 1 === activeTabKey ? theme.discordleColors.primary : '#fff'
      ),
      content: (
        <Fragment>
          <ChoosedMessage
            authorSelected={authorSelected}
            score={score}
            usedHint={usedHint}
            tabkey={activeTabKey}
            message={choosedMessage}
            switchValues={switchValues}
            openWarnExistsHint={openWarnExistsHint}
            setUsedHint={setUsedHint}
            setWarnExistsHint={setWarnExistsHint}
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
    <Fragment>
      <Skeleton paragraph={false} active={loading} loading={loading}>
        <S.Steps current={activeTabKey - 1} items={steps} />
      </Skeleton>

      <MessageContainer width="100%" margin="10px 0 0 0">
        <Skeleton
          active={loading}
          loading={loading}
          style={{ height: '250px', display: 'flex', alignItems: 'center' }}
        >
          {activeTabKey > 5 ? (
            <S.Load justify="center" align="middle">
              <LoadingOutlined
                style={{
                  marginRight: '15px',
                }}
              />
              {t('loadResult')}
            </S.Load>
          ) : (
            steps.map((step, index) => {
              if (index === activeTabKey - 1) return step.content;
            })
          )}
        </Skeleton>
      </MessageContainer>
    </Fragment>
  );
}
