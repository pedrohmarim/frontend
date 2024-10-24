import React, { Fragment } from 'react';
import * as I from './IHowWorks';
import * as S from './styles';
import * as G from 'globalStyles/global';
import { Container } from '../HomeDiscordleList/styles';
import { Col, FeatherIcons, Row } from 'antd_components';
import { useTranslation } from 'react-i18next';

export default function HowWorks({ width, botButton }: I.IHowWorks) {
  const isMobile = width <= 875;
  const { t, i18n } = useTranslation('Home');

  const cards: I.IHowWorksCard[] = [
    {
      title: t('firstCardTitle'),
      description: t('firstDescriptionTitle'),
      image: <FeatherIcons icon="settings" size={100} />,
    },
    {
      title: t('secondCardTitle'),
      description: t('secondDescriptionTitle'),
      image: <FeatherIcons icon="clock" size={100} />,
    },
    {
      title: t('thirdCardTitle'),
      description: t('thirdDescriptionTitle'),
      image: <FeatherIcons icon="edit" size={100} />,
    },
    {
      title: t('fourthCardTitle'),
      description: t('fourthDescriptionTitle'),
      image: <FeatherIcons icon="user-check" size={100} />,
    },
    {
      title: t('fifthCardTitle'),
      description: t('fifthDescriptionTitle'),
      image: <FeatherIcons icon="help-circle" size={100} />,
    },
    {
      title: t('sixthCardTitle'),
      description: t('sixthDescriptionTitle'),
      image: <FeatherIcons icon="bar-chart" size={100} />,
    },
  ];

  return (
    <Fragment>
      <S.Row gutter={[0, 16]} isMobile={isMobile}>
        <S.Title>
          {i18n.language === 'pt-BR' ? (
            <>
              Guia do <G.HomeSpan>Discordle</G.HomeSpan> em seu Servidor:
              Desvende Mistérios Diários!
            </>
          ) : (
            <>
              <G.HomeSpan>Discordle</G.HomeSpan> Guide in Your Server: Uncover
              Daily Mysteries!
            </>
          )}
        </S.Title>

        <S.Description>{t('descriptionHowItWorks')}</S.Description>
      </S.Row>

      <Container
        margin="30px 25px 0 25px"
        maxHeight="100%"
        padding="20px 20px 0 20px"
      >
        <Row gutter={[50, 50]}>
          {cards.map(({ description, image, title }, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
              <S.Card key={index}>
                <S.CardImage>{image}</S.CardImage>
                <S.CardTitle>{title}</S.CardTitle>
                <S.CardDescription>{description}</S.CardDescription>
              </S.Card>
            </Col>
          ))}
        </Row>

        {botButton()}
      </Container>
    </Fragment>
  );
}
