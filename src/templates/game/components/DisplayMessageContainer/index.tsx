import React from 'react';
import { FilterMessageEnum, MessageLevelEnum } from 'helpers/filterMessageEnum';
import * as S from './styles';
import Link from 'next/link';
import {
  IChoosedMessage,
  ILinkContainer,
} from '../ChoosedMessage/IChoosedMessage';

export default function DisplayMessageContainer({
  content,
  messageLevel,
  messageType,
  timestamp,
  formattedAttachs,
  urlLink,
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

  const LinkContainer = ({ content, urlLink }: ILinkContainer) => {
    const parts = content.split(urlLink);

    return (
      <>
        {parts[0]}

        <Link href={urlLink} target="_blank" rel="noopener noreferrer">
          {urlLink}
        </Link>

        {parts[1]}
      </>
    );
  };

  return (
    <>
      <S.Title>{titleMessage()}</S.Title>

      <S.Message>
        {messageType === FilterMessageEnum.isText && <>{content}</>}

        {messageType === FilterMessageEnum.isLink && (
          <LinkContainer content={content} urlLink={urlLink} />
        )}

        {messageType === FilterMessageEnum.isImage && (
          <S.ImageContainer>
            {formattedAttachs && formattedAttachs.map((item) => <>{item}</>)}
          </S.ImageContainer>
        )}

        {messageType === FilterMessageEnum.isImageWithText && (
          <>
            <>{content}</>

            <S.ImageContainer>
              {formattedAttachs && formattedAttachs.map((item) => <>{item}</>)}
            </S.ImageContainer>
          </>
        )}

        {messageType === FilterMessageEnum.isImageWithTextAndLink && (
          <>
            <LinkContainer content={content} urlLink={urlLink} />

            <S.ImageContainer>
              {formattedAttachs && formattedAttachs.map((item) => <>{item}</>)}
            </S.ImageContainer>
          </>
        )}
      </S.Message>

      {timestamp && (
        <S.Date justify="end">
          {new Date(timestamp).toLocaleString('pt-BR')}
        </S.Date>
      )}
    </>
  );
}
