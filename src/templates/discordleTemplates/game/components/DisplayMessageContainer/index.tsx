import React, { Fragment } from 'react';
import * as S from './styles';
import Link from 'next/link';
import { IChoosedMessage } from 'templates/discordleTemplates/game/components/ChoosedMessage/IChoosedMessage';
import {
  FilterMessageEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';

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

  const EmbedContainer = () => {
    if (!formattedAttachs.length) return <Fragment />;

    return <Fragment>{formattedAttachs[1]}</Fragment>;
  };

  const LinkContainer = () => {
    const parts = content.split(urlLink);

    return (
      <Fragment>
        {parts[0]}

        <Link href={urlLink} target="_blank" rel="noopener noreferrer">
          {urlLink}
        </Link>

        {parts[1]}
      </Fragment>
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
    <Fragment>
      <S.Title marginTop="15px">{titleMessage()}</S.Title>

      <S.Message>
        {messageType === FilterMessageEnum.isText && <DefaultContent />}

        {messageType === FilterMessageEnum.isLink && <LinkContainer />}

        {messageType === FilterMessageEnum.isEmbed && <EmbedContainer />}

        {messageType === FilterMessageEnum.isEmbed && <ImageContainer />}

        {messageType === FilterMessageEnum.isImageWithText && (
          <Fragment>
            <DefaultContent />

            <ImageContainer />
          </Fragment>
        )}

        {messageType === FilterMessageEnum.isImageWithTextAndLink && (
          <Fragment>
            <LinkContainer />

            <ImageContainer />
          </Fragment>
        )}
      </S.Message>

      {timestamp && (
        <S.Date justify="end">
          {new Date(timestamp).toLocaleString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </S.Date>
      )}
    </Fragment>
  );
}
