import React, { Fragment } from 'react';
import * as S from './styles';
import * as I from './IReferencedMessage';
import Link from 'next/link';
import { FeatherIcons, Row } from 'antd_components';
import { useMyContext } from 'Context';
import { IChoosedMessage } from 'templates/discordleTemplates/game/components/ChoosedMessage/IChoosedMessage';
import { Divider } from '../Result/styles';
import { useTranslation } from 'react-i18next';
import {
  MessageTypeEnum,
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
  fromResult = false,
}: IChoosedMessage) {
  const { windowWidth } = useMyContext();
  const { t } = useTranslation('Game');

  function titleMessage() {
    switch (messageLevel) {
      case MessageLevelEnum.isConsecutive:
        return t('previousMessage');
      case MessageLevelEnum.isPrevious:
        return t('consecutiveMessage');
      default:
        return `${t('message')}:`;
    }
  }

  const EmbedContainer = () => {
    if (!formattedAttachs.length) return <Fragment />;

    return <Fragment>{formattedAttachs[1]}</Fragment>;
  };

  const LinkContainer = () => {
    return (
      <S.DefaultContent>
        <Link href={urlLink} target="_blank" rel="noopener noreferrer">
          {urlLink}
        </Link>
      </S.DefaultContent>
    );
  };

  const ImageContainer = () => (
    <S.Carousel
      infinite={false}
      draggable={formattedAttachs.length > 1}
      dots={formattedAttachs.length > 1}
      cursor={formattedAttachs.length > 1 ? 'grabbing' : 'context-menu'}
    >
      {formattedAttachs.map((item, index) => (
        <Fragment key={index}>{item}</Fragment>
      ))}
    </S.Carousel>
  );

  const ReferencedMessageContainer = ({ content }: I.IReferencedMessage) => (
    <Row justify="start" align="middle">
      <FeatherIcons icon="corner-up-right" size={20} />

      <S.ReferencedMessageContainer width={windowWidth}>
        <S.ReferecendMessageContent
          width={windowWidth}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </S.ReferencedMessageContainer>
    </Row>
  );

  const DefaultContent = () => (
    <S.DefaultContent dangerouslySetInnerHTML={{ __html: content }} />
  );

  return (
    <S.Container fromResult={fromResult}>
      {!fromResult &&
        switchValues &&
        Boolean(switchValues.ShowReferencedMessage) &&
        referencedMessage && (
          <ReferencedMessageContainer content={referencedMessage} />
        )}

      {!fromResult && (
        <Row justify="space-between" align="middle">
          <S.Title
            isHint={
              messageLevel !== MessageLevelEnum.isMain &&
              Boolean(switchValues?.ShowHintsAuthors)
            }
          >
            {titleMessage()}
          </S.Title>
        </Row>
      )}

      <Row justify="end">
        {switchValues && Boolean(switchValues.ShowHintsAuthors) && author && (
          <S.AuthorContainer
            align="middle"
            justify="start"
            fromresult={fromResult}
          >
            <S.Avatar src={author?.Avatar} size={28} />
            <S.HintAuthorUsername>{author.Username}</S.HintAuthorUsername>
          </S.AuthorContainer>
        )}

        {fromResult && (
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
        )}
      </Row>

      <S.Message fromResult={fromResult}>
        {messageType === MessageTypeEnum.isText && <DefaultContent />}
        {messageType === MessageTypeEnum.isLink && <LinkContainer />}
        {messageType === MessageTypeEnum.isEmbed && <EmbedContainer />}
        {messageType === MessageTypeEnum.isImage && <ImageContainer />}

        {messageType === MessageTypeEnum.isImageWithText && (
          <Fragment>
            <DefaultContent />
            <ImageContainer />
          </Fragment>
        )}

        {messageType === MessageTypeEnum.isImageWithTextAndLink && (
          <Fragment>
            {urlLink && <LinkContainer />}
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
    </S.Container>
  );
}
