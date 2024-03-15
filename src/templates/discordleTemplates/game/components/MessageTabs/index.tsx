import React, { useState } from 'react';
import { MessageLevelEnum } from 'helpers/discordle/filterMessageEnum';
import ChoosedMessage from 'templates/discordleTemplates/game/components/ChoosedMessage';
import AuthorSelect from 'templates/discordleTemplates/game/components/AuthorSelect';
import * as I from './IMessageTabs';
import * as S from './styles';
import { IChoosedMessage } from 'templates/discordleTemplates/game/components/ChoosedMessage/IChoosedMessage';
import { FeatherIcons, Row } from 'antd_components';
import theme from 'globalStyles/theme';

export default function MessageTabs({
  activeTabKey,
  choosedMessages,
  awnsers,
  authors,
  serverName,
  serverIcon,
  saveScore,
  setActiveTabKey,
}: I.IMessageTabs) {
  const [usedHint, setUsedHint] = useState<boolean>(false);

  const handleTabChange = (key: string) => setActiveTabKey(Number(key));

  function handleIcon(index: number, current: number) {
    let icon = '';
    let color = '';

    if (awnsers[index]?.Success === undefined) return '';

    if (awnsers[index]?.TabKey === current && awnsers[index]?.Success) {
      icon = 'check-circle';
      color = awnsers[index]?.Score === 2 ? '#009e3f' : '#d48a00';
    } else {
      icon = 'x-circle';
      color = '#a61f1f';
    }

    return <FeatherIcons icon={icon} color={color} size={18} />;
  }

  const score = awnsers.reduce((accumulator, curValue) => {
    return accumulator + curValue.Score;
  }, 0);

  return (
    <S.Tabs activeKey={String(activeTabKey)} onChange={handleTabChange}>
      {choosedMessages.map(
        ({ message, formattedAttachs, messageType, urlLink }, index) => {
          const { Timestamp: timestamp, Content: content, Id: id } = message;
          const current = index + 1;

          const choosedMessage: IChoosedMessage = {
            content: content,
            timestamp: timestamp,
            id: id,
            messageLevel: MessageLevelEnum.isMain,
            urlLink: urlLink,
            formattedAttachs: formattedAttachs,
            messageType: messageType,
          };

          return (
            <S.TabsPane
              disabled={current !== activeTabKey}
              key={String(current)}
              tab={
                awnsers && (
                  <Row justify="center">
                    {handleIcon(index, current) || (
                      <FeatherIcons
                        icon="help-circle"
                        size={18}
                        color={
                          current === activeTabKey
                            ? theme.discordleColors.primary
                            : '#fff'
                        }
                      />
                    )}

                    <S.MessageTabTitle>{`Mensagem ${current}`}</S.MessageTabTitle>
                  </Row>
                )
              }
            >
              <ChoosedMessage
                serverName={serverName}
                serverIcon={serverIcon}
                setUsedHint={(value) => setUsedHint(value)}
                message={choosedMessage}
                score={score}
              />

              <AuthorSelect
                activeTabKey={activeTabKey}
                messageId={choosedMessage.id}
                authors={authors}
                usedHint={usedHint}
                setUsedHint={(value) => setUsedHint(value)}
                saveScore={saveScore}
                setActiveTabKey={setActiveTabKey}
              />
            </S.TabsPane>
          );
        }
      )}
    </S.Tabs>
  );
}
