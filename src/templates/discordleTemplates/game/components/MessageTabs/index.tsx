import React, { useState, useEffect, Fragment } from 'react';
import ChoosedMessage from 'templates/discordleTemplates/game/components/ChoosedMessage';
import AuthorSelect from 'templates/discordleTemplates/game/components/AuthorSelect';
import DiscordleGameAPI from 'services/DiscordleService/DiscordleGame';
import ConfigurationModal from './ConfigurationModal';
import * as I from './IMessageTabs';
import * as S from './styles';
import { FeatherIcons, Row } from 'antd_components';
import theme from 'globalStyles/theme';
import { useRouter } from 'next/router';

export default function MessageTabs({
  activeTabKey,
  choosedMessages,
  awnsers,
  usedHint,
  authors,
  serverName,
  serverIcon,
  saveScore,
  setUsedHint,
  setActiveTabKey,
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

    if (!awnsers[index]?.Success || awnsers[index]?.UsedHint)
      icon = 'help-circle';

    if (
      awnsers[index]?.TabKey === current &&
      awnsers[index]?.Success &&
      !awnsers[index]?.UsedHint
    ) {
      icon = 'check-circle';
      color = awnsers[index]?.Score === 2 ? '#009e3f' : '#d48a00';
    }

    if (
      awnsers[index]?.TabKey === current &&
      !awnsers[index]?.Success &&
      !awnsers[index]?.UsedHint
    ) {
      icon = 'x-circle';
      color = '#a61f1f';
    }

    return <FeatherIcons icon={icon} color={color} size={18} />;
  }

  const score = awnsers.reduce((accumulator, curValue) => {
    return accumulator + curValue.Score;
  }, 0);

  return (
    <Fragment>
      <ConfigurationModal openModal={openModal} setOpenModal={setOpenModal} />

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
                awnsers && (
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
                score={score}
                isOwner={isOwner}
                openModal={openModal}
                authorSelected={authorSelected}
                usedHint={usedHint}
                tabkey={activeTabKey}
                serverName={serverName}
                serverIcon={serverIcon}
                message={choosedMessage}
                setUsedHint={setUsedHint}
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
