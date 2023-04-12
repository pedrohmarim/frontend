import React, { useState } from 'react';
import { MessageLevelEnum } from 'helpers/filterMessageEnum';
import ChoosedMessage from '../ChoosedMessage';
import AuthorSelect from '../AuthorSelect';
import * as I from './IMessageTabs';
import * as S from './styles';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';
import { FeatherIcons, Row } from 'antd_components';
import theme from 'globalStyles/theme';

export default function MessageTabs({
  activeTabKey,
  choosedMessages,
  awnsers,
  serverName,
  serverIcon,
  setActiveTabKey,
  setAwnsers,
}: I.IMessageTabs) {
  const [usedHint, setUsedHint] = useState<boolean>(false);

  const handleTabChange = (key: string) => setActiveTabKey(Number(key));

  function handleIcon(index: number, current: number) {
    let icon = '';
    let color = '';

    if (awnsers[index]?.success === undefined) return '';

    if (awnsers[index]?.tabKey === current && awnsers[index]?.success) {
      icon = 'check-circle';
      color = awnsers[index]?.score === 2 ? '#009e3f' : '#d48a00';
    } else {
      icon = 'x-circle';
      color = '#a61f1f';
    }

    return <FeatherIcons icon={icon} color={color} size={18} />;
  }

  const score = awnsers.reduce((accumulator, curValue) => {
    return accumulator + curValue.score;
  }, 0);

  return (
    <S.Tabs activeKey={String(activeTabKey)} onChange={handleTabChange}>
      {choosedMessages.map(
        (
          { authors, message, formattedAttachs, messageType, urlLink },
          index
        ) => {
          const { timestamp, content, id, author } = message;
          const current = index + 1;

          const choosedMessage: IChoosedMessage = {
            content,
            timestamp,
            id,
            messageLevel: MessageLevelEnum.isMain,
            urlLink,
            formattedAttachs,
            messageType,
            authorsOptions: authors,
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
                            ? theme.colors.primary
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
                setUsedHint={(value) => setUsedHint(value)}
                usedHint={usedHint}
                setAwnsers={setAwnsers}
                authorMessage={author.username}
                authorsOptions={authors}
                activeTabKey={activeTabKey}
                setActiveTabKey={setActiveTabKey}
              />
            </S.TabsPane>
          );
        }
      )}
    </S.Tabs>
  );
}
