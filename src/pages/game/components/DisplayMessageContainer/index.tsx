import React from 'react';
import { FilterMessageEnum, MessageLevelEnum } from 'helpers/filterMessageEnum';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';
import { sanitize } from 'dompurify';
import * as S from './styles';

export default function DisplayMessageContainer({
  content,
  messageLevel,
  messageType,
  timestamp,
  formattedAttachs,
}: IChoosedMessage) {
  function titleMessage() {
    switch (messageLevel) {
      case MessageLevelEnum.isConsecutive:
        return 'Mensagem anterior:';
      case MessageLevelEnum.isPrevious:
        return 'Próxima mensagem:';
      case MessageLevelEnum.isMain:
        return 'Mensagem:';
      default:
        return 'Não foi possível recuperar a mensagem';
    }
  }

  if (!content.length && !formattedAttachs.length) return <></>;

  return (
    <>
      {FilterMessageEnum.isImage !== messageType && (
        <>
          <S.Title>{titleMessage()}</S.Title>

          <S.Message>
            {FilterMessageEnum.isLink === messageType ? (
              <div dangerouslySetInnerHTML={{ __html: sanitize(content) }} />
            ) : (
              content
            )}
          </S.Message>
        </>
      )}

      {FilterMessageEnum.isImage === messageType && (
        <>
          <S.Title marginTop="20px">Imagem:</S.Title>

          <S.ImageContainer>
            {formattedAttachs && formattedAttachs.map((item) => <>{item}</>)}
          </S.ImageContainer>
        </>
      )}

      {timestamp && (
        <S.Date justify="end">
          {new Date(timestamp).toLocaleString('pt-BR')}
        </S.Date>
      )}
    </>
  );
}
