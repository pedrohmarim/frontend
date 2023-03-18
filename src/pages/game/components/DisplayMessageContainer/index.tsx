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
      default:
        return 'Mensagem:';
    }
  }

  const imageMessageIncludesText = [
    FilterMessageEnum.isLink,
    FilterMessageEnum.isMention,
    FilterMessageEnum.isText,
  ].some((value) => messageType?.includes(value));

  return (
    <>
      {imageMessageIncludesText && (
        <>
          <S.Title>{titleMessage()}</S.Title>

          <S.Message>
            {messageType?.includes(FilterMessageEnum.isLink) ? (
              <div dangerouslySetInnerHTML={{ __html: sanitize(content) }} />
            ) : (
              <>{content}</>
            )}
          </S.Message>
        </>
      )}

      {messageType?.includes(FilterMessageEnum.isImage) && (
        <>
          <S.Title marginTop="20px">
            {!imageMessageIncludesText ? 'Imagem:' : 'Imagem da mensagem:'}
          </S.Title>

          <S.ImageContainer>
            {formattedAttachs && formattedAttachs.map((item) => <>{item}</>)}
          </S.ImageContainer>
        </>
      )}

      {!messageType.length && (
        <>
          <S.Title>{titleMessage()}</S.Title>

          <S.Message>{content}</S.Message>
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
