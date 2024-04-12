import React, { Fragment, useState } from 'react';
import { FeatherIcons } from 'antd_components';
import * as S from './styles';
import * as I from './IMessageSteps';
import theme from 'globalStyles/theme';
import ChoosedMessage from 'templates/discordleTemplates/game/components/ChoosedMessage';
import AuthorSelect from 'templates/discordleTemplates/game/components/AuthorSelect';
import ConfigurationModal from '../ConfigurationModal';
import { MessageContainer } from 'globalStyles/global';

export default function MessageSteps({
  openWarnExistsHint,
  choosedMessages,
  switchValues,
  activeTabKey,
  usedHint,
  isOwner,
  answers,
  authors,
  saveScore,
  setUsedHint,
  setSwitchValues,
  setActiveTabKey,
  setWarnExistsHint,
}: I.IMessageSteps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [authorSelected, setAuthorSelected] = useState<string>('');

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
    <Fragment>
      <ConfigurationModal
        openModal={openModal}
        switchValues={switchValues}
        setOpenModal={setOpenModal}
        setSwitchValues={setSwitchValues}
      />

      {steps.length === 5 &&
        activeTabKey >= 1 &&
        activeTabKey <= steps.length && (
          <Fragment>
            <S.Steps current={activeTabKey - 1} items={steps} />

            <MessageContainer width="100%" margin="10px 0 0 0">
              {steps.map((step, index) => {
                if (index === activeTabKey - 1) return step.content;
              })}
            </MessageContainer>
          </Fragment>
        )}
    </Fragment>
  );
}
