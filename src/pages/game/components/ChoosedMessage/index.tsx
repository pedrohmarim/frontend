import { FilterMessageEnum } from 'helpers/filterMessageEnum';
import React from 'react';
import * as S from './styles';
import * as I from './IChoosedMessage';

const ChoosedMessage = ({
  content,
  formattedAttachs,
  messageType,
  timestamp,
}: I.IChoosedMessage) => (
  <S.MessageContainer>
    <S.GameTitle>Guess the Idiot</S.GameTitle>

    {content.length > 0 && (
      <>
        <S.Title>Mensagem:</S.Title>

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

    <S.Date justify="end">{new Date(timestamp).toLocaleString('pt-BR')}</S.Date>
  </S.MessageContainer>
);

export default ChoosedMessage;
