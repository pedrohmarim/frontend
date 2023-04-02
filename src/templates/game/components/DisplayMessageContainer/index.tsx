import React, { Fragment } from 'react';
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

  const ImageContainer = () => (
    <S.Carousel
      infinite={false}
      draggable
      cursor={formattedAttachs.length > 1 ? 'grabbing' : 'context-menu'}
    >
      {formattedAttachs &&
        formattedAttachs.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
    </S.Carousel>
  );

  const DefaultContent = () => <>{content}</>;

  return (
    <>
      <S.Title marginTop="15px">{titleMessage()}</S.Title>

      <S.Message>
        {messageType === FilterMessageEnum.isText && <DefaultContent />}

        {messageType === FilterMessageEnum.isLink && (
          <LinkContainer content={content} urlLink={urlLink} />
        )}

        {messageType === FilterMessageEnum.isImage && <ImageContainer />}

        {messageType === FilterMessageEnum.isImageWithText && (
          <>
            <DefaultContent />

            <ImageContainer />
          </>
        )}

        {messageType === FilterMessageEnum.isImageWithTextAndLink && (
          <>
            <LinkContainer content={content} urlLink={urlLink} />

            <ImageContainer />
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
