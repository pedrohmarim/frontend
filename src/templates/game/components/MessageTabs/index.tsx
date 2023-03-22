import React from 'react';
import { MessageLevelEnum } from 'helpers/filterMessageEnum';
import ChoosedMessage from '../ChoosedMessage';
import AuthorSelect from '../AuthorSelect';
import * as I from './IMessageTabs';
import * as S from './styles';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';

export default function MessageTabs({
  activeTabKey,
  choosedMessages,
  score,
  setActiveTabKey,
  setScore,
}: I.IMessageTabs) {
  const handleTabChange = (key: string) => setActiveTabKey(Number(key));

  return (
    <S.Tabs activeKey={activeTabKey} onChange={handleTabChange}>
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
              disabled={String(current) !== activeTabKey}
              key={String(current)}
              tab={`Pergunta ${current}`}
            >
              <ChoosedMessage score={score} message={choosedMessage} />

              <AuthorSelect
                setScore={setScore}
                setActiveTabKey={setActiveTabKey}
                authorMessage={author.username}
                authorsOptions={authors}
              />
            </S.TabsPane>
          );
        }
      )}
    </S.Tabs>
  );
}
