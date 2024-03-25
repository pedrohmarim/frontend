import React, { Fragment } from 'react';
import * as S from './styles';
import * as I from './IReferencedMessage';
import Link from 'next/link';
import { FeatherIcons, Row } from 'antd_components';
import { IChoosedMessage } from 'templates/discordleTemplates/game/components/ChoosedMessage/IChoosedMessage';
import {
  FilterMessageEnum,
  MessageLevelEnum,
} from 'helpers/discordle/filterMessageEnum';

export default function DisplayMessageContainer({
  author,
  content,
  urlLink,
  timestamp,
  messageType,
  switchValues,
  messageLevel,
  formattedAttachs,
  referencedMessage,
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

  const ReferencedMessageContainer = ({ content }: I.IReferencedMessage) => (
    <S.ReferencedMessageContainer>
      <Row justify="start" align="middle">
        <FeatherIcons icon="corner-up-right" size={20} />

        <S.SpanWithMarginLeft dangerouslySetInnerHTML={{ __html: content }} />
      </Row>
    </S.ReferencedMessageContainer>
  );

  const DefaultContent = () => (
    <S.DefaultContent dangerouslySetInnerHTML={{ __html: content }} />
  );

  return (
    <Fragment>
      {switchValues &&
        switchValues.ShowReferencedMessage &&
        referencedMessage && (
          <ReferencedMessageContainer content={referencedMessage} />
        )}

      <Row justify="space-between">
        <S.Title>{titleMessage()}</S.Title>

        {switchValues && switchValues.ShowHintsAuthors && author && (
          <S.AuthorContainer align="middle" justify="start">
            <S.Avatar src={author?.Avatar} size={28} />
            <S.SpanWithMarginLeft>{author.Username}</S.SpanWithMarginLeft>
          </S.AuthorContainer>
        )}
      </Row>

      <S.Message>
        {messageType === FilterMessageEnum.isText && <DefaultContent />}
        {messageType === FilterMessageEnum.isLink && <LinkContainer />}
        {messageType === FilterMessageEnum.isEmbed && <EmbedContainer />}
        {messageType === FilterMessageEnum.isImage && <ImageContainer />}

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
