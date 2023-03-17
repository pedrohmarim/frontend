import { FilterMessageEnum, MessageLevelEnum } from 'helpers/filterMessageEnum';
import React from 'react';
import { IChoosedMessage } from '../ChoosedMessage/IChoosedMessage';
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

  return (
    <>
      {content.length > 0 && (
        <>
          <S.Title>{titleMessage()}</S.Title>

          <S.Message>{content}</S.Message>
        </>
      )}

      {formattedAttachs.length > 0 && (
        <>
          <S.Title marginTop="20px">
            {FilterMessageEnum.isLink === messageType ? 'Link:' : 'Imagem:'}
          </S.Title>

          <S.ImageContainer>
            {formattedAttachs && formattedAttachs.map((item) => <>{item}</>)}
          </S.ImageContainer>
        </>
      )}

      <S.Date justify="end">
        {new Date(timestamp).toLocaleString('pt-BR')}
      </S.Date>
    </>
  );
}
