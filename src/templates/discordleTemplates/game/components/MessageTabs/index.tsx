import React, { useState, useEffect, Fragment } from 'react';
import ChoosedMessage from 'templates/discordleTemplates/game/components/ChoosedMessage';
import AuthorSelect from 'templates/discordleTemplates/game/components/AuthorSelect';
import DiscordleGameAPI from 'services/DiscordleService/DiscordleGame';
import ConfigurationModal from './components/ConfigurationModal';
import * as I from './IMessageTabs';
import * as S from './styles';
import { FeatherIcons, Row } from 'antd_components';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';

export default function MessageTabs({
  openWarnExistsHint,
  choosedMessages,
  activeTabKey,
  switchValues,
  serverName,
  serverIcon,
  usedHint,
  answers,
  authors,
  saveScore,
  setUsedHint,
  setActiveTabKey,
  setSwitchValues,
  setWarnExistsHint,
}: I.IMessageTabs) {
  const router = useRouter();
  const [authorSelected, setAuthorSelected] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleTabChange = (key: string) => setActiveTabKey(Number(key));

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

    return <FeatherIcons icon={icon} color={color} size={18} />;
  }

  const score = answers.reduce((accumulator, curValue) => {
    return accumulator + curValue.Score;
  }, 0);

  return (
    <Fragment>
      {switchValues && (
        <ConfigurationModal
          openModal={openModal}
          switchValues={switchValues}
          setOpenModal={setOpenModal}
          setSwitchValues={setSwitchValues}
        />
      )}

      <S.Tabs
        activeKey={String(activeTabKey)}
        onChange={handleTabChange}
        moreIcon={false}
      >
        {choosedMessages.map((choosedMessage, index) => {
          const current = index + 1;

          return (
            <S.TabsPane
              disabled
              key={String(current)}
              tab={
                answers && (
                  <Row justify="center">
                    {handleIcon(
                      index,
                      current,
                      current === activeTabKey
                        ? theme.discordleColors.primary
                        : '#fff'
                    )}

                    <S.MessageTabTitle>{`Mensagem ${current}`}</S.MessageTabTitle>
                  </Row>
                )
              }
            >
              <ChoosedMessage
                authorSelected={authorSelected}
                openModal={openModal}
                isOwner={isOwner}
                score={score}
                usedHint={usedHint}
                tabkey={activeTabKey}
                serverName={serverName}
                serverIcon={serverIcon}
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
            </S.TabsPane>
          );
        })}
      </S.Tabs>
    </Fragment>
  );
}
