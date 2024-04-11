import React, { Fragment } from 'react';
import * as I from './IHowWorks';
import * as S from './styles';
import { HomeSpan } from 'globalStyles/global';
import { Container } from '../HomeDiscordleList/styles';
import { Col, FeatherIcons, Row } from 'antd_components';

export default function HowWorks({ width, botButton }: I.IHowWorks) {
  const isMobile = width <= 875;

  const cards: I.IHowWorksCard[] = [
    {
      title: 'Configuração do Bot',
      description:
        'Convide nosso bot para o seu servidor do Discord e escolha o canal de texto que deseja incluir no jogo',
      image: <FeatherIcons icon="settings" size={100} />,
    },
    {
      title: 'Sorteio Diário',
      description:
        'Durante a criação do jogo, o Bot irá sortear 5 mensagens aleatórias, após isso o mesmo evento ocorrerá todos os dias ás 23:59 (América/São_Paulo).',
      image: <FeatherIcons icon="clock" size={100} />,
    },
    {
      title: 'Customização',
      description:
        'O dono do servidor terá a liberdade de determinar o valor de pontos atribuídos a cada mensagem, além de poder optar por aumentar a dificuldade do jogo ao ocultar certas dicas.',
      image: <FeatherIcons icon="edit" size={100} />,
    },
    {
      title: 'Escolha seu perfil',
      description:
        'Após concluir a criação do Discord para o canal selecionado, escolha seu perfil e confirme seu código de verificação.',
      image: <FeatherIcons icon="user-check" size={100} />,
    },
    {
      title: 'Adivinhe quem mandou as mensagens',
      description:
        'Use suas habilidades para descobrir quem enviou cada mensagem e acumule pontos para subir no ranking.',
      image: <FeatherIcons icon="help-circle" size={100} />,
    },
    {
      title: 'Competição Amigável',
      description:
        'Envolva-se em uma competição amigável com amigos para disputar o topo do ranking.',
      image: <FeatherIcons icon="bar-chart" size={100} />,
    },
  ];

  return (
    <Fragment>
      <S.Row gutter={[0, 16]} isMobile={isMobile}>
        <S.Title>
          Guia do <HomeSpan>Discordle</HomeSpan> em seu Servidor: Desvende
          Mistérios Diários!
        </S.Title>

        <S.Description>
          Descubra como transformar seu servidor Discord em uma arena de
          investigação com nosso jogo de adivinhação exclusivo. Teste suas
          habilidades diariamente ao tentar desvendar quem enviou mensagens
          misteriosas sorteadas pelo bot. Competição amigável, diversão
          garantida e desafios emocionantes esperam por você!
        </S.Description>
      </S.Row>

      <Container
        margin="50px 25px 0 25px"
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
